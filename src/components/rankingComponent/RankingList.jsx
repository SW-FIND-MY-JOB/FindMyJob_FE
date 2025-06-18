import React from 'react';
import styles from './RankingList.module.css';
import { FaCrown, FaMedal, FaAward } from 'react-icons/fa';

const RankingList = ({ rankings }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaCrown className={styles.goldCrown} />;
      case 2:
        return <FaMedal className={styles.silverMedal} />;
      case 3:
        return <FaAward className={styles.bronzeAward} />;
      default:
        return <span className={styles.rankNumber}>{rank}</span>;
    }
  };

  return (
    <div className={styles.rankingList}>
      {rankings.map((item, index) => (
        <div key={index} className={styles.rankingItem}>
          <div className={styles.rankInfo}>
            {getRankIcon(index + 1)}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{item.userName}</span>
              <span className={styles.resumeTitle}>{item.resumeTitle}</span>
            </div>
          </div>
          <div className={styles.points}>
            {index < 3 && (
              <span className={styles.pointBadge}>
                {index === 0 ? '+1000' : index === 1 ? '+500' : '+300'} P
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingList; 