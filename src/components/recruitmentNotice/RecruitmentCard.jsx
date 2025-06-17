import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecruitmentCard.module.css';
import {Star} from 'lucide-react';
import LoginModal from '../login/LoginModal';
import { toggleScrapNotice } from '../../api/recruitmentNotice/RecruitmentNotice';
import { useAuth } from '../../utils/AuthContext';

const JobCard = ({ job, onScrapToggle }) => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [triedExtIdx, setTriedExtIdx] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
    const [scrapState, setScrapState] = useState(job.isScrap);
  const extensions = ['.svg', '.jfif', '.webp'];

  const handleScrapClick = async (id, scrapState) => {
    if (!isLogin) 
      return setShowLoginModal(true);

    const response = await toggleScrapNotice(id, scrapState);
    if (response.isSuccess) {
      onScrapToggle(id);
      setScrapState(!scrapState);
    }
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

  return (
    <>
      <div className={styles.cardContainer} >
        <div className={styles.cardHeader}>
          {!imgError && getLogoPath() ? (
            <img src={getLogoPath()} alt={job.company} className={styles.companyLogo} onError={handleImageError} />
          ) : (
            <div className={styles.defaultLogo}>{job.company?.charAt(0).replace(/[^가-힣A-Za-z0-9]/g, '') || '?'}</div>
          )}
          <div className={styles.companyName}>{job.company}</div>
        </div>
        <div className={styles.cardContent} onClick={() => navigate(`/recruitment-notice/${job.id}`)} style={{ cursor: 'pointer' }}>
          <div className={styles.jobMeta}>
            <div className={styles.jobTitle}>{job.title}</div>
            <span>{job.location} / {job.recrutSeNm} / {job.acbgCondNmLst} / {job.hireTypeNmLst}</span>
          </div>
          <div className={styles.jobDate}>마감일 {job.deadline}</div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.viewCount}><span>조회 {job.viewCount}</span></div>
          <Star 
            className={`${styles.starIcon} ${scrapState ? styles.active : ''}`}
            onClick={() => handleScrapClick(job.id, scrapState)}
            fill={scrapState ? '#FFD700' : 'none'}
          />
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

const RecruitmentCardList = ({ jobs, totalElements, loading, error, page, totalPages, onPageChange, onScrapToggle }) => {
  const MAX_VISIBLE_PAGES = 10;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((page - 1) / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES + 1;
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNextGroup = () => {
    const currentGroup = Math.floor((page - 1) / MAX_VISIBLE_PAGES);
    const nextGroupStart = (currentGroup + 1) * MAX_VISIBLE_PAGES + 1;
    if (nextGroupStart <= totalPages) {
      onPageChange(nextGroupStart);
    }
  };

  const handlePrevGroup = () => {
    const currentGroup = Math.floor((page - 1) / MAX_VISIBLE_PAGES);
    const prevGroupStart = Math.max((currentGroup - 1) * MAX_VISIBLE_PAGES + 1, 1);
    onPageChange(prevGroupStart);
  };

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
              {page > 1 && <button onClick={handlePrevGroup}>{'<'}</button>}
              {getPageNumbers().map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`${styles.pageButton} ${page === pageNum ? styles.active : ''}`}>
                  {pageNum}
                </button>
              ))}
              {page < totalPages && <button onClick={handleNextGroup}>{'>'}</button>}
              {page < totalPages && <button onClick={() => onPageChange(totalPages)}>{'>>'}</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { JobCard, RecruitmentCardList };
