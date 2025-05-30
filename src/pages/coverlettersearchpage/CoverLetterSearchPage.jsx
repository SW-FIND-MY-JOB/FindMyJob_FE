import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import CompanySelector from '../../components/company/CompanySelector';
import JobSelector from '../../components/job/JobSelector';
import CoverLetterRow from '../../components/cover-letter-row/CoverLetterRow';
import styles from './CoverLetterSearchPage.module.css';
import coverLetterData from '../../data/cover_letter_mock.json';

export default function CoverLetterSearchPage() {
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate(); // ✅ 페이지 이동 훅

  const filteredData = coverLetterData.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

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
            <button className={styles.searchButton}>검색</button>
          </div>
        </div>

        <div className={styles.writeButtonContainer}>
          <button className={styles.writeButton}
          onClick={() => navigate('/cover-letter-question')}
          >글쓰기</button>
        </div>

        <table className={styles.resultTable}>
          <colgroup>
            <col style={{ width: '6%' }} />   {/* 글번호 */}
            <col style={{ width: '14%' }} />  {/* 기업명 */}
            <col style={{ width: '14%' }} />  {/* 직무명 */}
            <col style={{ width: '46%' }} />  {/* 자소서 질문/내용 */}
            <col style={{ width: '10%' }} />  {/* 조회수 */}
            <col style={{ width: '10%' }} />  {/* 스크랩 */}
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
            {paginatedData.map((item, idx) => (
              <CoverLetterRow key={item.id} item={item} index={startIdx + idx} />
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ''}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
