import styles from './MainTopArea.module.css';

import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { getRecentNotice, getScrapNotice} from '../../api/notice/noticeAPI';
import {toggleScrapNotice} from '../../api/recruitmentNotice/RecruitmentNotice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import RecruitmentCard from './RecruitmentCard';
import LoginModal from '../login/LoginModal';

export default function MainTopArea(){
    const [isRecentNotice, setIsRecentNotice] = useState(true);
    const { isLogin } = useAuth();

    const [ recentNoticeList, setRecentNoticeList] = useState([]);
    const [ scrapNoticeList, setScrapNoticeList] = useState([]);
    const [showLogin, setShowLogin] = useState(false);

    const [scrollIndex, setScrollIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(5);

    //처음 공고 데이터 가져오기
    useEffect(()=>{
        fetchRecentNotice(1, 30);
        fetchScrapNotice(1, 30);
    }, [isRecentNotice]);

    //로그인 상태가 풀리면 최근 공고를 보여주도록 바꿈!
    useEffect(() => {
        if(!isLogin)
            setIsRecentNotice(true);
    }, [isLogin]);


    //화면 사이즈에 따라 보여줄 공고 개수 변경경
    useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;

        if (width >= 1600) {
            setItemsPerView(5);
        } else if (width >= 1100)  {
            setItemsPerView(4);
        } else{
            setItemsPerView(3);
        }
    };

    // 초기 실행
    handleResize();

    // 이벤트 등록
    window.addEventListener('resize', handleResize);

    // 언마운트 시 해제
    return () => window.removeEventListener('resize', handleResize);
}, []);

    // 탭이 변경될 때마다 슬라이더 위치 초기화
    useEffect(() => {
        setScrollIndex(0);
    }, [isRecentNotice]);

    //최근공고 가져오기
    const fetchRecentNotice = async(page, size) => {
        try{
            const response = await getRecentNotice(page, size);
            console.log(response.content);
            setRecentNoticeList(response.content);
        } catch (error) {
            console.log("최근 공고 가져오기 에러");
            console.log(error.response);
        }
    }

    //스크랩 공고 가져오기
    const fetchScrapNotice = async(page, size) => {
        try{
            const response = await getScrapNotice(page, size);
            setScrapNoticeList(response.content);
        } catch (error) {
            console.log("스크랩 공고 가져오기 에러");
            console.log(error.response);
        }
    }

    //스크랩
    const onScrapToggle = async (id, isScrap, setScrapState) => {
        if(!isLogin){
            setShowLogin(true);
            return;
        }

        try{
            console.log(isScrap);
            await toggleScrapNotice(id, isScrap);
            setScrapState(!isScrap);
        } catch (error){
            console.log(error.response);
        }
    }

    const currentList = isRecentNotice ? recentNoticeList : scrapNoticeList;
    const visibleList = currentList.slice(scrollIndex, scrollIndex + itemsPerView);

    return(
        <div className={styles.mainTopAreaLayout}>
            <div className={styles.tabArea}>
                <p className={isRecentNotice ? styles.active : ''} onClick={() => setIsRecentNotice(true)}>최근 공고</p>
                {isLogin && (
                    <p className={!isRecentNotice ? styles.active : ''} onClick={() => setIsRecentNotice(false)}>관심 공고</p>
                )}
            </div>
            {/* 슬라이더 또는 빈 목록 안내 */}
            {!isRecentNotice && scrapNoticeList.length === 0 ? (
                <div className={styles.emptyScrapMsg}>
                    관심 공고가 없습니다. 관심 있는 공고를 스크랩 해보세요!
                </div>
            ) : (
                <div className={styles.cardSlider}>
                    {scrollIndex > 0 ? (
                        <button className={styles.navBtn} onClick={() => setScrollIndex((prev) => prev - 1)}>
                            <ChevronLeft />
                        </button>
                    ) : (
                        <div className={styles.emptyBtn}></div>
                    )}
                    {visibleList.map((notice) => (
                        <RecruitmentCard key={notice.id} notice={notice} onScrapToggle={onScrapToggle} />
                    ))}
                    {scrollIndex + itemsPerView < currentList.length ? (
                        <button className={styles.navBtn} onClick={() => setScrollIndex((prev) => prev + 1)}>
                            <ChevronRight />
                        </button>
                    ) : (
                        <div className={styles.emptyBtn}></div>
                    )}
                </div>
            )}
            {showLogin && 
                <LoginModal onClose={() => setShowLogin(false)}/>
            }
        </div>
    );
}