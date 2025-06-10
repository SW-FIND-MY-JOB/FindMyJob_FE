import React, { useState, useEffect } from 'react';
import styles from './RecruitmentNoticePage.module.css';
import { FilterSection } from '../../components/recruitmentNotice/FilterColumn';
import { RecruitmentCardList } from '../../components/recruitmentNotice/RecruitmentCard';
import { fetchRecruitmentNotices } from '../../api/recruitmentNotice/RecruitmentNotice';

const RecruitmentNoticePage = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(40);
  const [filters, setFilters] = useState({});
  const [jobPosts, setJobPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobPosts = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchRecruitmentNotices(searchParams);

      if (response.isSuccess) {
        const { content, totalPages, totalElements } = response.result;
        setJobPosts(content || []);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('오류:', err);
      setError(err.message || '채용공고 조회 중 오류가 발생했습니다.');
      setJobPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchJobPosts({ ...newFilters, page: 1, size });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobPosts({ ...filters, page: newPage, size });
  };

  const handleScrapToggle = (noticeId) => {
    setJobPosts(prev =>
      prev.map(post =>
        post.id === noticeId
          ? { ...post, isScrap: !post.isScrap }
          : post
      )
    );
  };

  useEffect(() => {
    fetchJobPosts({ page, size });
  }, []);

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.searchHeader}>채용공고 상세검색</h1>
        <FilterSection onFilterChange={handleFilterChange} />
        <RecruitmentCardList
          jobs={jobPosts}
          totalElements={totalElements}
          loading={loading}
          error={error}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onScrapToggle={handleScrapToggle}
        />
      </div>
    </div>
  );
};

export default RecruitmentNoticePage;
