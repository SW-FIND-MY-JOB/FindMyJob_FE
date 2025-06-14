import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecruitmentNoticeDetail, requestNoticeMoreDetail } from '../../api/recruitmentNotice/ClickedRecruitmentNotice';
import styles from './RecruitmentNoticeDetail.module.css';
import { Star } from 'lucide-react';
import { toggleScrapNotice } from '../../api/recruitmentNotice/RecruitmentNotice';
import { useAuth } from '../../utils/AuthContext';
import LoginModal from '../../components/login/LoginModal';

const RecruitmentNoticeDetail = () => {
  const { id } = useParams();
  const [noticeDetail, setNoticeDetail] = useState(null);
  const [noticeFileList, setNoticeFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrapState, setScrapState] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLogin } = useAuth();

  // 섹션 refs – 각 버튼이 가리킬 위치
  const noticeRef = useRef(null);
  const applyRef = useRef(null);
  const dueRef = useRef(null);
  const etcRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchRecruitmentNoticeDetail(id);

        if (response.isSuccess) {
          setNoticeDetail(response.result);
          setScrapState(response.result.isScrap);
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

    const fetchNoticeMoreDetail = async () => {
      try {
        const response = await requestNoticeMoreDetail(id);
        setNoticeFileList(response.result.files);
        console.log(response.result.files);
        console.log(noticeFileList);
      } catch (err) {
        console.error('에러:', err);
      }
    };

    fetchNoticeDetail();
    fetchNoticeMoreDetail();
  }, [id]);

  const handleScrapClick = async () => {
    if (!isLogin) return setShowLoginModal(true);

    const response = await toggleScrapNotice(id, scrapState);
    if (response.isSuccess) {
      setScrapState(!scrapState);
    } else {
      alert(response.message || '스크랩 처리 실패');
    }
  };

  // yyyymmdd 형태의 문자열을 "yyyy년 mm월 dd일" 형식으로 변환
  const formatEstablishmentDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!noticeDetail) {
    return <div className={styles.error}>채용공고를 찾을 수 없습니다.</div>;
  }

  // 회사 로고 경로 생성 (URL 인코딩 처리)
  const logoSrc = `/logos/${encodeURIComponent(noticeDetail.instNm)}.svg`;
  const handleLogoError = (e) => {
    e.target.onerror = null; // 무한 반복 방지
    e.target.src = '/logos/default_logo.svg'; // 기본 로고 또는 빈 이미지 경로
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>

        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>{noticeDetail.recrutPbancTtl}</h1>
          <div className={styles.companyInfo}>
            <h2>{noticeDetail.instNm}</h2>
            <div className={styles.actions}>
              <Star
                className={`${styles.scrapIcon} ${scrapState ? styles.active : ''}`}
                onClick={handleScrapClick}
                fill={scrapState ? '#FFD700' : 'none'}
              />
              <div className={styles.viewCount}>조회수: {noticeDetail.viewCnt}</div>
            </div>
          </div>
        </div>

        {/* 본문 & 사이드바 래퍼 */}
        <div className={styles.bodyWrapper}>
          {/* 본문 */}
          <div className={styles.mainContent}>
            <div className={styles.contentHeader}>
              {/* 상단 탭 버튼 */}
              <button className={styles.tabBtn} onClick={() => scrollTo(noticeRef)}>채용정보</button>
              <button className={styles.tabBtn} onClick={() => scrollTo(applyRef)}>지원정보</button>
              <button className={styles.tabBtn} onClick={() => scrollTo(dueRef)}>접수기간</button>
              <button className={styles.tabBtn} onClick={() => scrollTo(etcRef)}>기타정보</button>
            </div>

            {/* 채용정보 */}
            <section ref={noticeRef} className={styles.section}>
              <h3 className={styles.sectionTitle}>채용정보</h3>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>근무지역</th>
                    <td>{noticeDetail.workRgnNmLst || '정보 없음'}</td>
                  </tr>
                  <tr>
                    <th>직무(직종)</th>
                    <td>{noticeDetail.ncsCdNmLst || '정보 없음'}</td>
                  </tr>
                  <tr>
                    <th>근무형태</th>
                    <td>{noticeDetail.hireTypeNmLst || '정보 없음'}</td>
                  </tr>
                  <tr>
                    <th>경력</th>
                    <td>{noticeDetail.recruitSeNm || '정보 없음'}</td>
                  </tr>
                  <tr>
                    <th>학력</th>
                    <td>{noticeDetail.acbgCondNmLst || '정보 없음'}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 지원정보 */}
            <section ref={applyRef} className={styles.section}>
              <h3 className={styles.sectionTitle}>지원방법</h3>
              <ul className={styles.infoList}>
                <li>{noticeDetail.scrnprcdrMthdExpln || '정보 없음'}</li>
                <h4>자세한 정보</h4>
                <li>
                  {noticeDetail.srcUrl && (noticeDetail.srcUrl.startsWith('www') || noticeDetail.srcUrl.startsWith('http')) ? (
                    <a href={noticeDetail.srcUrl} target="_blank" rel="noreferrer">{noticeDetail.srcUrl}</a>
                  ) : (
                    '정보 없음'
                  )}
                </li>
              </ul>
            </section>

            {/* 접수기간 */}
            <section ref={dueRef} className={styles.section}>
              <h3 className={styles.sectionTitle}>접수기간</h3>
              <ul className={styles.infoList}>
                <li style={{color: 'rgb(251, 93, 31)', fontSize: '1.2rem', fontWeight: '500'}}>- {noticeDetail.pbancBgngYmd || '정보 없음'} ~ {noticeDetail.pbancEndYmd + " (23:59)" || '정보 없음'} </li>
              </ul>
            </section>

            {/* 기타정보 */}
            <section ref={etcRef} className={styles.section}>
              <h3 className={styles.sectionTitle}>기타 안내사항</h3>
              <h4>지원 조건</h4>
              <p>{noticeDetail.aplyQlfcCn || '지원 조건 없음'}</p>
              <h4>우대 조건</h4>
              <p>{noticeDetail.prefCondCn || '우대 조건 없음'}</p>
              <h4>제한 조건</h4>
              <p>{noticeDetail.disqlfcRsn || '제한 조건 없음'}</p>
            </section>
          </div>

          {/* 회사 정보 사이드 */}
          <aside className={styles.side}>
            <div className={styles.companyInfo}>
              <img
                className={styles.companyLogo}
                src={logoSrc}
                alt={`${noticeDetail.instNm} 로고`}
                onError={handleLogoError}
              />
              <div className={styles.companyMeta}>
                <p>기업명: {noticeDetail.instNm || '정보 없음'}</p>
                <p>대표자: {noticeDetail.captain || '정보 없음'}</p>
                <p>설립일: {noticeDetail.establishmentAt ? formatEstablishmentDate(noticeDetail.establishmentAt) : '정보 없음'}</p>
                <p>주소: {noticeDetail.address || '정보 없음'}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* 첨부파일 - 페이지 하단 */}
        <section className={styles.fileSection}>
          <div className={styles.fileWrapper}>
            <div className={styles.fileTitle}>첨부파일</div>
            <div className={styles.fileList}>
              {noticeFileList.map((file) => (
                <a key={file.atchFileNm} href={file.url} target="_blank" rel="noreferrer">
                  {file.atchFileNm}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default RecruitmentNoticeDetail;
