import React, { useState } from 'react';
import styles from './RecruitmentCard.module.css';

const RecruitmentCard = ({ job }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        {!imgError && job.logoUrl ? (
          <img 
            src={job.logoUrl} 
            alt={job.company} 
            className={styles.companyLogo}
            onError={handleImageError}
          />
        ) : (
          <div className={styles.defaultLogo}>
            {job.company?.charAt(0) || '?'}
          </div>
        )}
        <div className={styles.jobTitle}>{job.title}</div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.jobMeta}>
          <span>{job.location}</span>
          <span className={styles.separator}>•</span>
          <span>{job.field}</span>
          {job.recruitSeNm && (
            <>
              <span className={styles.separator}>•</span>
              <span>{job.recruitSeNm}</span>
            </>
          )}
        </div>
        <div className={styles.jobDate}>마감일 {job.deadline}</div>
        <div className={styles.companyName}>{job.company}</div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.viewCount}>
          <span>조회 {job.viewCount}</span>
        </div>
        <button 
          className={`${styles.scrapButton} ${job.isScrap ? styles.scrapped : ''}`}
          aria-label={job.isScrap ? "스크랩 취소" : "스크랩하기"}
        >
          {job.isScrap ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default RecruitmentCard;
