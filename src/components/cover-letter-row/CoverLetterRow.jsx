// src/components/cover-letter-row/CoverLetterRow.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import styles from './CoverLetterRow.module.css';
import { addCoverLetterScrap, removeCoverLetterScrap } from '../../api/coverletterGetList/getList';
import { useAuth } from '../../utils/AuthContext';

export default function CoverLetterRow({ item, index }) {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [isScraped, setIsScraped] = useState(item.isScrap || false);
  const [loading, setLoading] = useState(false);

  const handleRowClick = () => {
    navigate(`/assay?id=${item.id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation(); // 행 클릭 이벤트 전파 방지

    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    setLoading(true);
    try {
      if (isScraped) {
        await removeCoverLetterScrap(item.id);
        setIsScraped(false);
      } else {
        await addCoverLetterScrap(item.id);
        setIsScraped(true);
      }
    } catch (error) {
      console.error('스크랩 처리 실패:', error);
      const errorMessage = error.response?.data?.message || '스크랩 처리에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className={`${styles.row} ${styles.clickableRow}`} onClick={handleRowClick}>
      <td>{index + 1}</td>
      <td>{item.instNm}</td>
      <td>{item.ncsCdNmLst}</td>
      <td>
        <div>
          <strong>{item.title}</strong>
          <div className={styles.snippet}>{item.content}</div>
        </div>
      </td>
      <td>{item.viewCnt ?? 0}</td>
      <td className={styles.bookmarkCell}>
        <button
          className={`${styles.bookmarkButton} ${isScraped ? styles.bookmarked : ''}`}
          onClick={handleBookmarkClick}
          disabled={loading}
          title={isScraped ? '스크랩 해제' : '스크랩하기'}
        >
          <Bookmark 
            size={24} 
            fill={isScraped ? '#007aff' : 'none'}
            color={isScraped ? '#007aff' : '#ccc'}
          />
        </button>
      </td>
    </tr>
  );
}
