import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import CompanySelector from '../../components/company/CompanySelector';
import JobSelector from '../../components/job/JobSelector';
import CoverLetterRow from '../../components/cover-letter-row/CoverLetterRow';
import styles from './CoverLetterSearchPage.module.css';
import { fetchCoverLetterList } from '../../api/coverletterGetList/getList';
import { useAuth } from '../../utils/AuthContext';
import LoginModal from '../../components/login/LoginModal';

export default function CoverLetterSearchPage() {
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [keyword, setKeyword] = useState('');
  const [coverLetters, setCoverLetters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { isLogin, isAuthChecked } = useAuth();

  const itemsPerPage = 8;

  // 인증 확인이 완료된 후에 자소서 목록 불러오기
  useEffect(() => {
    if (isAuthChecked) {
      handleSearch(1);
    }
  }, [isAuthChecked]); // isAuthChecked가 true가 되면 실행

  const handleSearch = async (page = 1) => {
    try {
      const data = await fetchCoverLetterList({
        instNm: company || 'all',
        category: job || 'all',
        keyword,
        page,
        size: itemsPerPage,
        isLogin, // 로그인 상태 전달
      });
      
      // 서버에서 받아온 데이터를 그대로 설정 (isScrap 포함)
      setCoverLetters(data.content || []);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('❌ 자소서 목록 불러오기 실패:', error);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(page);
  };

  // 스크랩 상태가 변경될 때 해당 자소서의 상태 업데이트
  const handleScrapToggle = (coverLetterId) => {
    setCoverLetters(prevLetters =>
      prevLetters.map(letter =>
        letter.id === coverLetterId
          ? { ...letter, isScrap: !letter.isScrap }
          : letter
      )
    );
  };

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.banner}>
          <h2>다른 지원자가 작성한 자소서를 검색해보세요!</h2>
          <div className={styles.searchBox}>
            <CompanySelector onSelect={setCompany} direction="down" />
            <JobSelector onSelect={setJob} direction="down" />
            <div className={styles.keywordWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="키워드 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.keywordInput}
              />
            </div>
            <button className={styles.searchButton} onClick={() => handleSearch(1)}>
              검색
            </button>
          </div>
        </div>

        <div className={styles.writeButtonContainer}>
          {isLogin ? (
            <button
              className={styles.writeButton}
              onClick={() => navigate('/cover-letter-question')}
            >
              글쓰기
            </button>
          ) : (
            <button
              className={styles.writeButton}
              onClick={() => setShowLoginModal(true)}
            >
              글쓰기
            </button>
          )}
        </div>

        <table className={styles.resultTable}>
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '46%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>기업명</th>
              <th>직무명</th>
              <th>자소서 질문/내용</th>
              <th>조회수</th>
              <th>스크랩</th>
            </tr>
          </thead>
          <tbody>
            {coverLetters.map((item, idx) => (
              <CoverLetterRow
                key={item.id}
                item={item}
                index={(currentPage - 1) * itemsPerPage + idx}
                onScrapToggle={handleScrapToggle}
              />
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? styles.active : ''}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
