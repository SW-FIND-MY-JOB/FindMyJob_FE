// src/components/cover-letter-row/CoverLetterRow.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import styles from './CoverLetterRow.module.css';
import { addCoverLetterScrap, removeCoverLetterScrap } from '../../api/coverletterGetList/getList';
import { useAuth } from '../../utils/AuthContext';
import LoginModal from '../login/LoginModal';

export default function CoverLetterRow({ item, index, onScrapToggle }) {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [scrapState, setScrapState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // item.isScrap 값이 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    setScrapState(item.isScrap || false);
  }, [item.isScrap]);

  const handleRowClick = () => {
    navigate(`/assay?id=${item.id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation(); // 행 클릭 이벤트 전파 방지

    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      if (scrapState) {
        await removeCoverLetterScrap(item.id);
        setScrapState(false);
        if (onScrapToggle) {
          onScrapToggle(item.id);
        }
      } else {
        await addCoverLetterScrap(item.id);
        setScrapState(true);
        if (onScrapToggle) {
          onScrapToggle(item.id);
        }
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
    <>
      <tr className={`${styles.row} ${styles.clickableRow}`} onClick={handleRowClick}>
        <td>{item.id}</td>
        <td>{item.instNm}</td>
        <td>{item.ncsCdNmLst}</td>
        <td>
          <div>
            <div className={styles.title}><strong>{item.title}</strong></div>
            <div className={styles.snippet}>{item.content}</div>
          </div>
        </td>
        <td>{item.viewCnt ?? 0}</td>
        <td className={styles.bookmarkCell}>
          <button
            className={`${styles.bookmarkButton} ${scrapState ? styles.bookmarked : ''}`}
            onClick={handleBookmarkClick}
            disabled={loading}
            title={scrapState ? '스크랩 해제' : '스크랩하기'}
          >
            <Bookmark 
              size={24} 
              fill={scrapState ? '#007aff' : 'none'}
              color={scrapState ? '#007aff' : '#ccc'}
            />
          </button>
        </td>
      </tr>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
