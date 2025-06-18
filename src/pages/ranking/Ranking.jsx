import React, { useState, useEffect } from 'react';
import styles from './Ranking.module.css';
import RankingList from '../../components/rankingComponent/RankingList';
import { FaTrophy, FaCrown, FaMedal, FaAward } from 'react-icons/fa';
import { fetchAllRankings } from '../../api/rankingApi/Ranking';

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRankings = async () => {
      try {
        const response = await fetchAllRankings();
        if (response.isSuccess) {
          // 포인트 기준으로 내림차순 정렬
          const sortedRankings = response.result.sort((a, b) => b.point - a.point);
          setRankings(sortedRankings);
        }
      } catch (error) {
        console.error('랭킹 데이터를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    getRankings();
  }, []);

  return (
    <div className={styles.rankingPage}>
      <div className={styles.header}>
        <FaTrophy className={styles.trophyIcon} />
        <h1>주간 베스트 자소서</h1>
        <p className={styles.subtitle}>이번 주 가장 잘 쓴 자기소개서를 확인하세요!<br />
          매주 월요일 00:05에 포인트가 지급됩니다.
        </p>
      </div>

      <div className={styles.prizeInfo}>
        <div className={styles.prizeCard}>
          <FaCrown className={styles.goldIcon} />
          <h3>🏆 1등</h3>
          {rankings.length > 0 && (
            <>
              <p>{rankings[0].point}점</p>
              <p className={styles.winnerName}>{rankings[0].writer}님</p>
            </>
          )}
        </div>
        <div className={styles.prizeCard}>
          <FaMedal className={styles.silverIcon} />
          <h3>🥈 2등</h3>
          {rankings.length > 1 && (
            <>
              <p>{rankings[1].point}점</p>
              <p className={styles.winnerName}>{rankings[1].writer}님</p>
            </>
          )}
        </div>
        <div className={styles.prizeCard}>
          <FaAward className={styles.bronzeIcon} />
          <h3>🥉 3등</h3>
          {rankings.length > 2 && (
            <>
              <p>{rankings[2].point}점</p>
              <p className={styles.winnerName}>{rankings[2].writer}님</p>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : (
        <RankingList rankings={rankings} />
      )}
    </div>
  );
};

export default Ranking;
