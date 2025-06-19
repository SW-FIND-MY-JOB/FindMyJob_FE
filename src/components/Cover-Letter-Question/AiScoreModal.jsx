import styles from './AiScoreModal.module.css';
import { useNavigate } from 'react-router-dom';

export default function AiScoreModal({ setIsOpen, id, score, point }) {
    const navigate = useNavigate();

    return (
        <div className={styles.overLayout}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>AI 채점 결과</h2>
                </div>
                <div className={styles.modalContent}>
                    <p className={styles.scoreText}><span className={styles.emoji}>💯</span> <strong>점수</strong>&nbsp;<span className={styles.highlightScore}>{score} / 1000</span></p>
                    <p className={styles.pointText}><span className={styles.emoji}>💰</span> <strong>리워드</strong>&nbsp;<span className={styles.highlightPoint}>{point}P</span><strong> 적립!</strong></p>
                </div>
                <div className={styles.modalFooter}>
                    <div className={styles.modalFooterButton} onClick={() => {setIsOpen(false); 
                        navigate(`/assay?id=${id}`)}}>확인</div>
                </div>
            </div>
        </div>
    );
}