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
          // ranking 기준으로 정렬 (이미 서버에서 정렬되어 올 것 같지만 안전하게)
          const sortedRankings = response.result.sort((a, b) => a.ranking - b.ranking);
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
          매주 일요일 자정 포인트가 지급됩니다.
        </p>
      </div>

      {/* 상위 3명을 정렬된 순서대로 보여주기 위한 prizeDetails */}
      {(() => {
        const prizeDetails = [
          { title: '🏆 1등', Icon: FaCrown, iconClass: styles.goldIcon },
          { title: '🥈 2등', Icon: FaMedal, iconClass: styles.silverIcon },
          { title: '🥉 3등', Icon: FaAward, iconClass: styles.bronzeIcon },
        ];

        return (
          <div className={styles.prizeInfo}>
            {prizeDetails.map((detail, idx) => {
              const winner = rankings[idx];
              return (
                <div className={styles.prizeCard} key={detail.title}>
                  <detail.Icon className={detail.iconClass} />
                  <h3>{detail.title}</h3>
                  {winner && (
                    <>
                      <p className={styles.winnerName}>{winner.writer}님</p>
                      <p>{winner.score}점</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}

      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : (
        <RankingList rankings={rankings} />
      )}
    </div>
  );
};

export default Ranking;
