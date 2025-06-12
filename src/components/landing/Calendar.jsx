import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import styles from "./Calendar.module.css";
import '../../styles/FullCalendar.css';
import '../../styles/tippy-custom.css';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScrapNoticeToDate } from '../../api/notice/noticeAPI';
import { useAuth } from '../../utils/AuthContext.jsx';

export default function Calendar() {
    const navigate = useNavigate();
    const { isLogin } = useAuth();
    const [events, setEvents] = useState([]);

    const fetchCalendar = async (year, month) => {
            try{
                console.log(`year: ${year}, month: ${month}`);
                const result = await getScrapNoticeToDate( year, month);
                console.log("캘린더 정보 가져옴!!!");
                console.log(result);
                noticeListToEvents(result);
            } catch (error) {
                console.log("캘린더 정보 가져오기 에러");
                console.log(error.response);
            }
        }

    //notice정보를 가져오면 events 형식으로 변환
    const noticeListToEvents = (result) => {
        const mapped = result.flatMap(scrap => [{
            title: `[시작] ${scrap.instNm}`,
            start: scrap.pbancBgngYmd,
            allDay: true,
            backgroundColor: 'rgb(43, 206, 43)', // 초록
            textColor: '#fff',
            extendedProps: {
                id: scrap.id,
                type: 'start',
                title: scrap.recrutPbancTtl
            },
            tooltip: scrap.recrutPbancTtl
        },
        {
            title: `[마감] ${scrap.instNm}`,
            start: scrap.pbancEndYmd,
            allDay: true,
            backgroundColor: 'rgb(247, 126, 40)', // 빨강
            textColor: '#fff',
            extendedProps: {
                id: scrap.id,
                type: 'end',
                title: scrap.recrutPbancTtl
            },
            tooltip: scrap.recrutPbancTtl
        }]);
        setEvents(mapped);
    } 

    return (
        <div className={styles.calendarLayout}>
            <h2 style={{marginLeft:'10px'}}>스크랩 채용공고 달력</h2>
            {/* 로그인이 안되어있다면 */}
            {!isLogin &&
                <div className={styles.overlay}>
                    <p>⚠ 비회원은 이용할 수 없는 기능입니다.</p>
                </div>
            }
            <FullCalendar
                locale={"kr"}
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                height={"auto"}
                width={"60vw"}
                events={events}
                datesSet={(arg) => {
                    const year = arg.view.currentStart.getFullYear();
                    const month = arg.view.currentStart.getMonth() + 1; // getMonth()는 0부터 시작
                    fetchCalendar(year, month); // 이 기준으로 백엔드에서 3개월치 응답
                }}
                eventDidMount={(info) => {
                    const tooltipText = info.event.extendedProps.title;
                    tippy(info.el, {
                        content: tooltipText,
                        placement: 'top',
                        arrow: true,
                        delay: [0, 0],
                        theme: 'my-tooltip',
                    });
                }}
                eventClick={(info) => {
                    const noticeId = info.event.extendedProps.id;
                    if (noticeId) {
                        navigate(`/recruitment/${noticeId}`);
                    }
                }}
            />
        </div>
    )
}