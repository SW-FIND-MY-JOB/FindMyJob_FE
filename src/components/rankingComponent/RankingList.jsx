import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RankingList.module.css';
import { FaCrown, FaMedal, FaAward, FaStar, FaTrophy } from 'react-icons/fa';

const RankingList = ({ rankings }) => {
  const navigate = useNavigate();

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

  const handleItemClick = (id) => {
    navigate(`/assay?id=${id}`);
  };

  const renderTopThree = (item, index) => {
    const rankStyles = {
      0: styles.firstPlace,
      1: styles.secondPlace,
      2: styles.thirdPlace
    };

    return (
      <div 
        key={item.id} 
        className={`${styles.rankingItem} ${rankStyles[index]}`}
        onClick={() => handleItemClick(item.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.rankInfo}>
          {getRankIcon(index + 1)}
          <div className={styles.userInfo}>
            <div className={styles.topThreeInfo}>
              <span className={styles.userName}>{item.writer}</span>
              <span className={styles.rankBadge}>
                {index === 0 ? '🥇 1st Place' : index === 1 ? '🥈 2nd Place' : '🥉 3rd Place'}
              </span>
            </div>
            <span className={styles.resumeTitle}>{item.title}</span>
            <span className={styles.companyInfo}>{item.instNm} - {item.ncsCdNmLst}</span>
          </div>
        </div>
        <div className={styles.points}>
          <div className={styles.pointContainer}>
            <FaStar className={styles.starIcon} />
            <span className={styles.pointBadge}>{item.point}점</span>
          </div>
          {index < 3 && (
            <span className={styles.rewardBadge}>
              {index === 0 ? '+1000' : index === 1 ? '+500' : '+300'} P
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.rankingList}>
      {rankings.map((item, index) => (
        index < 3 ? renderTopThree(item, index) : (
          <div 
            key={item.id} 
            className={styles.rankingItem}
            onClick={() => handleItemClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.rankInfo}>
              {getRankIcon(index + 1)}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{item.writer}</span>
                <span className={styles.resumeTitle}>{item.title}</span>
                <span className={styles.companyInfo}>{item.instNm} - {item.ncsCdNmLst}</span>
              </div>
            </div>
            <div className={styles.points}>
              <span className={styles.pointBadge}>{item.point}점</span>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default RankingList; 