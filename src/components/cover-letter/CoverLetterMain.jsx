import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CoverLetterMain.module.css';
import { addCoverLetterScrap, removeCoverLetterScrap, deleteCoverLetter } from '../../api/coverletterGetList/getList';
import { useAuth } from '../../utils/AuthContext';

export default function CoverLetterMain({ coverLetterData }) {
  const [scrapped, setScrapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (coverLetterData) {
      setScrapped(coverLetterData.isScrap || false);
    }
  }, [coverLetterData]);

  const toggleScrap = async () => {
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (!coverLetterData?.id) {
      alert('자소서 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setLoading(true);
    try {
      if (scrapped) {
        await removeCoverLetterScrap(coverLetterData.id);
        setScrapped(false);
      } else {
        await addCoverLetterScrap(coverLetterData.id);
        setScrapped(true);
      }
    } catch (error) {
      console.error('스크랩 처리 실패:', error);
      console.error('에러 응답:', error.response?.data);
      const errorMessage = error.response?.data?.message || '스크랩 처리에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isLogin) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (!coverLetterData?.id) {
      alert('자소서 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!window.confirm('정말 삭제하시겠습니까? 삭제된 자소서는 복구할 수 없습니다.')) {
      return;
    }

    setLoading(true);
    try {
      await deleteCoverLetter(coverLetterData.id);
      alert('자소서가 삭제되었습니다.');
      navigate('/cover-letter-search'); // 자소서 검색 페이지로 이동
    } catch (error) {
      console.error('자소서 삭제 실패:', error);
      alert('자소서 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 데이터가 없을 때 로딩 표시
  if (!coverLetterData) {
    return (
      <div className={styles.mainSection}>
        <div className={styles.loading}>자소서를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.mainSection}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>자기소개서</h2>
        <button
          className={`${styles.scrapButton} ${scrapped ? styles.active : ''}`}
          onClick={toggleScrap}
          disabled={loading}
        >
          {loading ? '처리중...' : (scrapped ? '★ 스크랩됨' : '☆ 스크랩')}
        </button>
      </div>

      <div className={styles.headerRow}>
        <div className={styles.metaActions}>
          <p className={styles.subtitle}>{coverLetterData.instNm} / {coverLetterData.ncsCdNmLst}</p>
          <span className={styles.createDate}>
            {new Date(coverLetterData.createAt).toLocaleDateString('ko-KR')}
          </span>
          <span className={styles.views}>조회수: {coverLetterData.viewCnt || 0}</span>
          
        </div>
        {coverLetterData.isAuthor && (
            <>
              <span 
                className={`${styles.action} ${loading ? styles.disabled : ''}`}
                onClick={!loading ? handleDelete : undefined}
              >
                {loading ? '처리중...' : '글삭제'}
              </span>
            </>
          )}
      </div>

      <div className={styles.questionBlock}>
        <h4 className={styles.label}>질문</h4>
        <p className={styles.question}>{coverLetterData.title}</p>
      </div>

      <h4 className={styles.label}>내용</h4>
      <div className={styles.content}>
        {coverLetterData.content.split('\n').map((line, index) => (
          <p key={index} className={styles.paragraph}>{line}</p>
        ))}
      </div>
    </div>
  );
}