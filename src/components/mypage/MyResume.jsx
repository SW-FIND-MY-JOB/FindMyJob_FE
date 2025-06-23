import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyResumes } from '../../api/myPage/myPageAPI';
import styles from './MyResume.module.css';
import { RiAddLine, RiEyeLine, RiDeleteBinLine } from 'react-icons/ri';
import { useAuth } from '../../utils/AuthContext';
import LoginModal from '../login/LoginModal';

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    size: 5,
    isFirst: true,
    isLast: true
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  const fetchResumes = async (page) => {
    try {
      const data = await getMyResumes(page, 5);
      setResumes(data.resumes);
      setPagination(data.pagination);
      console.log('패치 리쥬메 호출 당함 성공!');
    } catch (error) {
      console.error('자소서를 불러오는데 실패했습니다:', error);
    } 
  };

  useEffect(() => {
    fetchResumes(1);
  }, []);

  const handlePageChange = (page) => {
    fetchResumes(page);
  };

  const handleView = (resumeId) => {
    navigate(`/assay?id=${resumeId}`);
  };

  const handleWrite = () => {
    if (isLogin) {
      navigate('/cover-letter-question');
    } else {
      setShowLoginModal(true);
    }
  };

  const MAX_VISIBLE_PAGES = 10;

  // 현재 페이지(백엔드 0-based → 화면 1-based)
  const currentPageDisplay = pagination.currentPage + 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor((currentPageDisplay - 1) / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES + 1;
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, pagination.totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNextGroup = () => {
    const currentGroup = Math.floor((currentPageDisplay - 1) / MAX_VISIBLE_PAGES);
    const nextGroupStart = (currentGroup + 1) * MAX_VISIBLE_PAGES + 1;
    if (nextGroupStart <= pagination.totalPages) {
      handlePageChange(nextGroupStart);
    }
  };

  const handlePrevGroup = () => {
    const currentGroup = Math.floor((currentPageDisplay - 1) / MAX_VISIBLE_PAGES);
    const prevGroupStart = Math.max((currentGroup - 1) * MAX_VISIBLE_PAGES + 1, 1);
    handlePageChange(prevGroupStart);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>&emsp;내 자소서</h2>
        <button className={styles.writeButton} onClick={handleWrite}>
              글쓰기
            </button>
      </div>
      
      {resumes.length === 0 ? (
        <div className={styles.noResume}>
          <p>작성된 자소서가 없습니다.</p>
          {isLogin ? (
            <Link to="/cover-letter-question" className={styles.writeResumeBtn}>
              <RiAddLine size={20} />
              자소서 작성하기
            </Link>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className={styles.writeResumeBtn}>
              <RiAddLine size={20} />
              자소서 작성하기
            </button>
          )}
        </div>
      ) : (
        <>
          <table className={styles.resumeTable}>
            <thead>
              <tr>
                <th>글번호</th>
                <th>기업명</th>
                <th>직무명</th>
                <th>자소서 질문/내용</th>
                <th>조회수</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume, idx) => (
                <tr key={resume.id} onClick={() => handleView(resume.id)} className={styles.resumeRow}>
                  <td>{pagination.totalElements - ((pagination.currentPage - 1) * pagination.size) - idx}</td>
                  <td>{resume.instNm}</td>
                  <td>{resume.ncsCdNmLst}</td>
                  <td className={styles.titleCell}>
                    <div className={styles.resumeTitle}>1. {resume.title}</div>
                    <div className={styles.resumeContent}>
                      {resume.content && resume.content.length > 50 ? `${resume.content.slice(0, 50)}...` : resume.content || '내용 없음'}
                    </div>
                  </td>
                  <td>{resume.viewCnt}</td>
                  <td>{resume.score}점</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.footer}>
            {pagination.totalPages > 0 && (
              <div className={styles.pagination}>
                {currentPageDisplay > 1 && (
                  <button onClick={() => handlePageChange(1)}>{'<<'}</button>
                )}
                {currentPageDisplay > 1 && (
                  <button onClick={handlePrevGroup}>{'<'}</button>
                )}

                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${styles.pageButton} ${
                      currentPageDisplay === pageNum ? styles.active : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {currentPageDisplay < pagination.totalPages && (
                  <button onClick={handleNextGroup}>{'>'}</button>
                )}
                {currentPageDisplay < pagination.totalPages && (
                  <button onClick={() => handlePageChange(pagination.totalPages)}>{'>>'}</button>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default MyResume; 