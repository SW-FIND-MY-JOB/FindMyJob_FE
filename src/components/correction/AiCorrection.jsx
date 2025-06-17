import styles from './AiCorrection.module.css';
import { getScrapCoverLetterList } from '../../api/correctionService/correctionAPI';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { getCorrection } from '../../api/correctionService/correctionAPI';
import { ScaleLoader } from "react-spinners";
import { isMinMaxLength } from "../../utils/validation";
import CorrectionModal from './CorrectionModal';

export default function AiCorrection({question, content, isModalOpen, setIsModalOpen, setSelectedContent}){
    const { isLogin, point, setPoint } = useAuth();
    
    const [scrapCoverLetterList, setScrapCoverLetterList] = useState([]);
    const [selectCoverLetterId, setSelectCoverLetterId] = useState(null);
    //AI첨삭을 했는지 유무
    const [isCorrection, setIsCorrection] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [correctionList, setCorrectionList] = useState([]);
    
    useEffect(() => {
        const fetchScraps = async () => {
            try{
                const result = await getScrapCoverLetterList();
                console.log(`AiCorrection:`, result);
                setScrapCoverLetterList(result);
            } catch (error){
                alert('에러?');
                console.log(`error: ${error}`);
            }
        };
        fetchScraps();
    }, []);

    //리스트 클릭시 선택한 리스트의 id저장
    const listSelectHandler = (id) => {
        //이전에 클릭한 리스트와 같으면 해제
        if(selectCoverLetterId == id){
            setSelectCoverLetterId(null);
            console.log('선택 해제');
            return;
        }
        setSelectCoverLetterId(id);
        console.log('id: ' + id);
    }

    //첨삭받기
    const correctionSubmit = async() => {
        //자소서 선택x
        if(selectCoverLetterId == null){
            alert("자기소개서를 선택해주세요.");
            return;
        }

        //질문 길이 검증
        if(!isMinMaxLength(question, 5, 500)){
            alert("질문은 5자 이상 500자 이하로 적어주세요.");
            return;
        }

        //내용 길이 검증
        if(!isMinMaxLength(content, 100, 2000)){
            alert("내용은 100자 이상 2000자 이하로 적어주세요.");
            return;
        }

        //이미 첨삭받은 내역이 있다면
        if(isCorrection){
            if(!window.confirm("AI첨삭을 다시 받으시면 기존에 첨삭한 내역이 사라집니다. \n그래도 진행하시겠습니까?")){
                return;
            }
        }

        //포인트 검사
        if(point <= 300){
            alert("포인트가 부족합니다.");
            return;
        }

        if(!window.confirm("300포인트가 차감됩니다. 진행하시겠습니까?")){
            return;
        }

        //로딩 걸기
        setIsLoading(true);        
        try{
            const reponse = await getCorrection({question, content, selectCoverLetterId});
            setCorrectionList(reponse);
            console.log(correctionList);
        } catch (error){
            console.log("AI자소서 첨삭에러" + error);
            alert("AI자소서가 현재 작동하지 않습니다. 잠시후에 다시 시도해주세요.");
            //로딩 풀기
            setIsLoading(false);
            return;
        };
        //로딩 풀기
        setIsLoading(false);
        //포인트 차감
        setPoint(point - 300);
        //AI 첨삭을 받음 표시
        setIsCorrection(true);
        //이전에 선택한 자소서 피드백 내용 삭제
        setSelectedContent('');
        //모달창 열기
        setIsModalOpen(true);
    }

    return (
        <div className={styles.aiCorrectionContainer}>
            <div className={styles.topLayout}>
                <h3 style={{margin: '0 0 10px 30px'}}>AI가 참고할 자소서 (300P 차감)</h3>
                {!isLoading && isCorrection && !isModalOpen &&
                    <div className={styles.openBtn}
                                        onClick={()=>setIsModalOpen(true)}
                    >AI첨삭보기</div>
                }
            </div>
            <span style={{margin: '0 0 0 30px' ,fontFamily: 'sans-serif', fontSize: '13px', fontWeight: '600', color: 'rgb(133, 133, 133)'}}>자기소개서를 1개 선택해 주세요. (선택한 자기소개서 흐름에 맞춰 AI 코칭이 진행됩니다.)</span>

            <div className={styles.coverLetterListContainer}>
                {/* 스크랩 정보가 있다면! */}
                {scrapCoverLetterList != null && scrapCoverLetterList.length != 0 &&
                    <ul className={styles.coverLetterListUlStyle}>
                        {scrapCoverLetterList.map((scrapCoverLetter) => (
                            <li
                                key={scrapCoverLetter.id}
                                className={`${styles.coverLetterListLiStyle} ${
                                            selectCoverLetterId === scrapCoverLetter.id ? styles.selected : ''
                                        }`}
                                onClick={()=>listSelectHandler(scrapCoverLetter.id)}
                            >
                                <p>{scrapCoverLetter.title}</p>
                                <p>{scrapCoverLetter.instNm} / {scrapCoverLetter.ncsCdNmLst}</p>
                                <span>{scrapCoverLetter.content}</span>
                            </li>
                        ))}
                    </ul>
                }
            </div>

            {/* 로그인이 안되어있다면! */}
            {!isLogin ? 
                <div className={styles.overlay}>
                    <p style={{fontSize:'30px'}}>⚠ 비회원은 이용할 수 없는 기능입니다.</p>
                </div>
            // 스크랩이 안되어있다면
            :
                scrapCoverLetterList == null || scrapCoverLetterList.length == 0 &&
                <div className={styles.overlay}>
                    <p style={{fontSize:'30px'}}>다른 지원자가 쓴 자소서를 스크랩 해주세요!</p>
                </div>
            }

            <div className={styles.aiCorrectionBtnLayout}>
                <div className={styles.aiCorrectionBtn}
                    onClick={()=>correctionSubmit()}
                >
                    AI 첨삭받기
                </div>
            </div>

            {isLoading &&
                <div className={styles.overlay}>
                    <ScaleLoader
                        barCount={10}
                        height={50}
                        margin={7}
                        radius={10}
                        width={10}
                        color="#9acaec"
                    />
                    <p>AI가 분석중입니다...</p>
                </div>
            }

            {/* AI 첨삭 모달창 열기 */}
            {!isLoading && isCorrection && isModalOpen &&
                <CorrectionModal 
                    correctionList={correctionList}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedContent={setSelectedContent}
                />
            }
        </div>
    );
}