import { useState } from 'react';
import styles from './CorrectionModal.module.css';

export default function CorrectionModal({correctionList, setIsModalOpen, setSelectedContent}){
    const [selectedIndex, setSelectedIndex] = useState(null);

    const selectIndexHandler = (index, content) => {
        if (selectedIndex == index){
            setSelectedIndex(null);
            setSelectedContent('');
            return;
        }
        
        setSelectedIndex(index);
        setSelectedContent(content);
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.topLayout}>
                <h2 style={{margin: '0 0 10px 30px'}}>AI 피드백 결과</h2>
                <div className={styles.closeBtn}
                    onClick={()=>setIsModalOpen(false)}
                >닫기</div>
            </div>
            <div className={styles.correctionListContainer}>
                <ul className={styles.correctionListUlStyle}>
                    {correctionList && correctionList.map((correction, index) => (
                        <li
                            key={index}
                            onClick={() => selectIndexHandler(index, correction.content)}
                            className={`${styles.correctionListStyle} ${
                                selectedIndex === index ? styles.selectedCard : ''
                            }`}
                        >   
                            <h3 className={styles.indexTitle}>
                                [{index+1}번째 문장]
                            </h3>
                            <p className={styles.correctionContent}>
                                {correction.content}
                            </p>
                            {correction.goodPoint &&
                                <p className={styles.correctionGoodPoint}>
                                    <strong>✅ 잘쓴 점</strong><br/>{correction.goodPoint}
                                </p>
                            }
                            {correction.editPoint &&
                                <p className={styles.correctionEditPoint}>
                                    <strong>❗수정할 점</strong><br/>{correction.editPoint}
                                </p>
                            }
                            {correction.editContent &&
                                <p className={styles.correctionEditContent}>
                                    <strong>✏️ AI추천 문장</strong><br/>{correction.editContent}
                                </p>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}