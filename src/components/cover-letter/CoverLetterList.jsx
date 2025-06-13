import { useNavigate } from 'react-router-dom';
import styles from './CoverLetterList.module.css';

export default function CoverLetterList({ recentInformList }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/assay?id=${id}`);
  };

  // 데이터가 없거나 빈 배열일 때
  if (!recentInformList || recentInformList.length === 0) {
    return (
      <div className={styles.listSection}>
        <h4 className={styles.listTitle}>다른 자소서</h4>
        <div className={styles.emptyMessage}>
          관련 자소서가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.listSection}>
      <h4 className={styles.listTitle}>다른 자소서</h4>
      <div className={styles.scrollArea}>
        {recentInformList.map((item) => (
          <div
            key={item.id}
            className={styles.listItem}
            onClick={() => handleClick(item.id)}
          >
            <div className={styles.company}>{item.instNm} / {item.ncsCdNmLst}</div>
            <div className={styles.question}>
              {item.title}
            </div>
            <div className={styles.preview}>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
