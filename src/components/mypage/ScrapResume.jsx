import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getScrapResumes, removeScrapResume } from '../../api/myPage/myPageAPI';
import styles from './ScrapResume.module.css';
import { RiAddLine, RiEyeLine, RiDeleteBinLine } from 'react-icons/ri';

const ScrapResume = () => {
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const data = await getScrapResumes();
        setScraps(data);
      } catch (error) {
        console.error('스크랩한 자소서를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScraps();
  }, []);

  const handleRemoveScrap = async (resumeId) => {
    try {
      await removeScrapResume(resumeId);
      setScraps(scraps.filter(scrap => scrap.id !== resumeId));
    } catch (error) {
      console.error('스크랩 삭제에 실패했습니다:', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.scrapResume}>
      {scraps.length === 0 ? (
        <div className={styles.noScrap}>
          <p>스크랩한 자소서가 없습니다.</p>
          <Link to="/resume" className={styles.browseResumeBtn}>
            <RiAddLine size={20} />
            자소서 둘러보기
          </Link>
        </div>
      ) : (
        <div className={styles.scrapList}>
          {scraps.map((scrap) => (
            <div key={scrap.id} className={styles.scrapItem}>
              <h3>{scrap.title}</h3>
              <p>작성자: {scrap.author}</p>
              <p>작성일: {new Date(scrap.createdAt).toLocaleDateString()}</p>
              <div className={styles.scrapActions}>
                <Link to={`/resume/${scrap.id}`} className={styles.viewBtn}>
                  <RiEyeLine size={18} />
                  보기
                </Link>
                <button
                  onClick={() => handleRemoveScrap(scrap.id)}
                  className={styles.removeScrapBtn}
                >
                  <RiDeleteBinLine size={18} />
                  스크랩 삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapResume; 