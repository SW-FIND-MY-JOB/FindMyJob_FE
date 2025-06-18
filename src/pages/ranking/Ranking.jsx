import React, { useState, useEffect } from 'react';
import styles from './Ranking.module.css';
import RankingList from '../../components/rankingComponent/RankingList';
import { FaTrophy } from 'react-icons/fa';

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API 연동
    // 임시 데이터
    const dummyData = [
      { userName: '김철수', resumeTitle: '프론트엔드 개발자 자기소개서' },
      { userName: '이영희', resumeTitle: '백엔드 개발자 자기소개서' },
      { userName: '박지민', resumeTitle: 'UI/UX 디자이너 자기소개서' },
      { userName: '정민수', resumeTitle: '데이터 사이언티스트 자기소개서' },
      { userName: '최유진', resumeTitle: 'AI 엔지니어 자기소개서' },
      { userName: '강동원', resumeTitle: '보안 엔지니어 자기소개서' },
      { userName: '윤서연', resumeTitle: '클라우드 엔지니어 자기소개서' },
      { userName: '한지민', resumeTitle: 'DevOps 엔지니어 자기소개서' },
      { userName: '송혜교', resumeTitle: '프로젝트 매니저 자기소개서' },
      { userName: '이병헌', resumeTitle: '시스템 아키텍트 자기소개서' },
    ];

    setRankings(dummyData);
    setLoading(false);
  }, []);

  return (
    <div className={styles.rankingPage}>
      <div className={styles.header}>
        <FaTrophy className={styles.trophyIcon} />
        <h1>주간 베스트 자소서</h1>
        <p className={styles.subtitle}>이번 주 가장 인기있는 자기소개서를 확인하세요!</p>
      </div>

      <div className={styles.prizeInfo}>
        <div className={styles.prizeCard}>
          <h3>🏆 1등</h3>
          <p>1,000 포인트</p>
        </div>
        <div className={styles.prizeCard}>
          <h3>🥈 2등</h3>
          <p>500 포인트</p>
        </div>
        <div className={styles.prizeCard}>
          <h3>🥉 3등</h3>
          <p>300 포인트</p>
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
