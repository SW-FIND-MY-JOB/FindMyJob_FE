import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecruitmentNoticeDetail } from '../../api/recruitmentNotice/ClickedRecruitmentNotice';
import styles from './RecruitmentNoticeDetail.module.css';

const RecruitmentNoticeDetail = () => {
  const { id } = useParams();
  const [noticeDetail, setNoticeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchRecruitmentNoticeDetail(id);

        if (response.isSuccess) {
          setNoticeDetail(response.result);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('채용공고 상세 정보를 불러오는데 실패했습니다.');
        console.error('에러:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!noticeDetail) {
    return <div className={styles.error}>채용공고를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{noticeDetail.recrutPbancTtl}</h1>
        <div className={styles.companyInfo}>
          <h2>{noticeDetail.instNm}</h2>
          <div className={styles.viewCount}>조회수: {noticeDetail.viewCnt}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <h3>근무 지역</h3>
            <p>{noticeDetail.workRgnNmLst || '정보 없음'}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>기관 유형</h3>
            <p>{noticeDetail.ncsCdNmLst || '정보 없음'}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>채용 유형</h3>
            <p>{noticeDetail.hireTypeNmLst || '정보 없음'}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>채용 구분</h3>
            <p>{noticeDetail.recruitSeNm || '정보 없음'}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>마감일</h3>
            <p>{noticeDetail.pbancEndYmd || '정보 없음'}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>스크랩 여부</h3>
            <p>{noticeDetail.isScarp ? '스크랩됨' : '스크랩되지 않음'}</p>
          </div>
        </div>

        {/* 중복 제거: 기관명과 유형은 infoSection에서 이미 표시됨 */}
      </div>
    </div>
  );
};

export default RecruitmentNoticeDetail;
