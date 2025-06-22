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

  const renderTopThree = (item) => {
    const rankStyles = {
      1: styles.firstPlace,
      2: styles.secondPlace,
      3: styles.thirdPlace
    };

    return (
      <div 
        key={item.id} 
        className={`${styles.rankingItem} ${rankStyles[item.ranking]}`}
        onClick={() => handleItemClick(item.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.rankInfo}>
          {getRankIcon(item.ranking)}
          <div className={styles.userInfo}>
            <div className={styles.topThreeInfo}>
              <span className={styles.userName}>{item.writer}</span>
            </div>
            <span className={styles.resumeTitle}>{item.title}</span>
            <span className={styles.companyInfo}>{item.instNm} - {item.ncsCdNmLst}</span>
          </div>
        </div>
        <div className={styles.points}>
          <div className={styles.pointContainer}>
            <FaStar className={styles.starIcon} />
            <span className={styles.pointBadge}>{item.score}점</span>
          </div>
          {item.ranking <= 3 && (
            <span className={styles.rewardBadge}>
              {item.ranking === 1 ? '+10000' : 
              item.ranking === 2 ? '+5000' : 
              '+3000'} P
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.rankingList}>
      {rankings.map((item) => (
        item.ranking <= 3 ? renderTopThree(item) : (
          <div 
            key={item.id} 
            className={styles.rankingItem}
            onClick={() => handleItemClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.rankInfo}>
              {getRankIcon(item.ranking)}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{item.writer}</span>
                <span className={styles.resumeTitle}>{item.title}</span>
                <span className={styles.companyInfo}>{item.instNm} - {item.ncsCdNmLst}</span>
              </div>
            </div>
            <div className={styles.points}>
              <span className={styles.pointBadge}>{item.score}점</span>
              {item.ranking <= 10 && (
                <span className={styles.rewardBadge}>
                  +1000 P
                </span>
              )}
            </div>
            
          </div>
        )
      ))}
    </div>
  );
};

export default RankingList; 