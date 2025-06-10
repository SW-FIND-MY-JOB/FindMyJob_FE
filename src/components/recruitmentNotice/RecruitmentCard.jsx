import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecruitmentCard.module.css';
import LoginModal from '../login/LoginModal';
import { toggleScrapNotice } from '../../api/recruitmentNotice/RecruitmentNotice';

const JobCard = ({ job, onScrapToggle }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [triedExtIdx, setTriedExtIdx] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem('accessToken');
  const extensions = ['.svg', '.jfif', '.webp'];

  const handleScrapClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return setShowLoginModal(true);
    const response = await toggleScrapNotice(job.id, job.isScrap);
    if (response.isSuccess) onScrapToggle(job.id);
    else alert(response.message || '스크랩 처리 실패');
  };

  const getLogoPath = () => (
    triedExtIdx < extensions.length ? `/logos/${job.company}${extensions[triedExtIdx]}` : null
  );

  const handleImageError = () => {
    if (triedExtIdx < extensions.length - 1) {
      setTriedExtIdx(triedExtIdx + 1);
    } else {
      setImgError(true);
    }
  };

  const formatList = (val) => Array.isArray(val) ? val.join(', ') : val || '';

  return (
    <>
      <div className={styles.cardContainer} onClick={() => navigate(`/recruitment-notice/${job.id}`)} style={{ cursor: 'pointer' }}>
        <div className={styles.cardHeader}>
          {!imgError && getLogoPath() ? (
            <img src={getLogoPath()} alt={job.company} className={styles.companyLogo} onError={handleImageError} />
          ) : (
            <div className={styles.defaultLogo}>{job.company?.charAt(0).replace(/[^가-힣A-Za-z0-9]/g, '') || '?'}</div>
          )}
          <div className={styles.jobTitle}>{job.title}</div>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.jobMeta}>
            <div>
              <span>{formatList(job.location)}</span>
              <span className={styles.separator}>•</span>
              <span>{formatList(job.field)}</span>
            </div>
            {job.recrutSeNm && <div><span>{job.recrutSeNm}</span></div>}
          </div>
          {job.acbgCondNmLst && <p>학력: {formatList(job.acbgCondNmLst)}</p>}
          {job.hireTypeNmLst && <p>고용형태: {formatList(job.hireTypeNmLst)}</p>}
          <div className={styles.jobDate}>마감일 {job.deadline}</div>
          <div className={styles.companyName}>{job.company}</div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.viewCount}><span>조회 {job.viewCount}</span></div>
          <button
            className={`${styles.scrapButton} ${job.isScrap ? styles.scrapped : ''}`}
            onClick={handleScrapClick}
            aria-label={job.isScrap ? "스크랩 취소" : "스크랩하기"}>
            {isLoggedIn ? (job.isScrap ? "★" : "☆") : "☆"}
          </button>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

const RecruitmentCardList = ({ jobs, totalElements, loading, error, page, totalPages, onPageChange, onScrapToggle }) => {
  const MAX_VISIBLE_PAGES = 8;
  const calculatePageRange = useCallback(() => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(page - half, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);
    if (end - start + 1 < MAX_VISIBLE_PAGES) start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    return { start, end };
  }, [page, totalPages]);

  return (
    <div className={styles.resultSection}>
      {error ? <div className={styles.error}>{error}</div> : (
        <>
          <div className={styles.resultHeader}>
            채용정보 총 {totalElements}건
            {loading && <span className={styles.loading}>로딩 중...</span>}
          </div>
          <div className={styles.cardGrid}>
            {jobs.map(job => (
              <JobCard
                key={job.id}
                job={{
                  title: job.recrutPbancTtl,
                  location: job.workRgnNmLst,
                  field: job.ncsCdNmLst,
                  company: job.instNm,
                  deadline: job.pbancEndYmd,
                  viewCount: job.viewCnt,
                  isScrap: job.isScrap,
                  id: job.id,
                  acbgCondNmLst: job.acbgCondNmLst,
                  hireTypeNmLst: job.hireTypeNmLst,
                  recrutSeNm: job.recrutSeNm
                }}
                onScrapToggle={onScrapToggle}
              />
            ))}
          </div>
          {totalPages > 0 && (
            <div className={styles.pagination}>
              {page > 1 && <button onClick={() => onPageChange(1)}>{'<<'}</button>}
              {page > 1 && <button onClick={() => onPageChange(page - 1)}>{'<'}</button>}
              {(() => {
                const { start, end } = calculatePageRange();
                return Array.from({ length: end - start + 1 }).map((_, i) => {
                  const pageNum = start + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={styles.pageButton}
                      style={{ backgroundColor: page === pageNum ? '#3b82f6' : 'white', color: page === pageNum ? 'white' : 'black' }}>
                      {pageNum}
                    </button>
                  );
                });
              })()}
              {page < totalPages && <button onClick={() => onPageChange(page + 1)}>{'>'}</button>}
              {page < totalPages && <button onClick={() => onPageChange(totalPages)}>{'>>'}</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { JobCard, RecruitmentCardList };
