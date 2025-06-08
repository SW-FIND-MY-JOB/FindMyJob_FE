import React, { useState } from 'react';
import styles from './RecruitmentCard.module.css';

const RecruitmentCard = ({ job }) => {
  const [imgError, setImgError] = useState(false);
  const [triedExtIdx, setTriedExtIdx] = useState(0);

  // 지원하는 이미지 확장자 목록
  const extensions = ['.svg', '.jfif', '.webp'];

  // 현재 시도 중인 확장자에 맞는 경로 반환
  const getLogoPath = () => {
    if (triedExtIdx < extensions.length) {
      return `/logos/${job.company}${extensions[triedExtIdx]}`;
    }
    return null;
  };

  const handleImageError = () => {
    // 다음 확장자 시도
    if (triedExtIdx < extensions.length - 1) {
      setTriedExtIdx(triedExtIdx + 1);
    } else {
      setImgError(true);
    }
  };

  const logoPath = getLogoPath();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        {!imgError && logoPath ? (
          <img 
            src={logoPath} 
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
