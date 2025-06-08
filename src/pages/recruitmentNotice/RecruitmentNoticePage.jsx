// 채용공고 상세검색 페이지 구현 (React + CSS Module 기준)
import React, { useState, useEffect } from 'react';
import styles from './RecruitmentNoticePage.module.css';
import FilterColumn from '../../components/recruitmentNotice/FilterColumn';
import RecruitmentCard from '../../components/recruitmentNotice/RecruitmentCard';
import { fetchRecruitmentNotices } from '../../api/recruitmentNotice/RecruitmentNotice';

const RecruitmentNoticePage = () => {
  // 필터 상태 관리
  const [filters, setFilters] = useState({
    regionCD: 'all',
    categoryCD: 'all',
    historyCD: 'all',
    eduCD: 'all',
    typeCD: 'all',
  });

  // 필터 옵션 상태 관리
  const [filterOptions, setFilterOptions] = useState({
    regions: new Set(),
    categories: new Set(),
    histories: new Set(),
    educations: new Set(),
    types: new Set(),
  });

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [jobPosts, setJobPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지네이션 관련 상수
  const MAX_VISIBLE_PAGES = 8; // 한 번에 보여줄 페이지 버튼 수를 8개로 수정

  // 페이지네이션 범위 계산 함수
  const calculatePageRange = () => {
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(page - halfVisible, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    // 끝부분 조정
    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    return { start, end };
  };

  // API 호출 함수
  const fetchJobPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 전체(all)인 경우 해당 파라미터 제외
      const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== 'all') {
          acc[key] = value;
        }
        return acc;
      }, {});

      const params = {
        ...cleanedFilters,
        ...(keyword && { keyword }),
        page: Math.max(1, page),
        size,
      };

      const response = await fetchRecruitmentNotices(params);

      if (response.isSuccess) {
        const { content, totalPages: total, totalElements: elements } = response.result;
        setJobPosts(content || []);
        setTotalPages(total || 0);
        setTotalElements(elements || 0);

        // 필터 옵션 업데이트
        if (content) {
          const newOptions = {
            regions: new Set(),
            categories: new Set(),
            histories: new Set(),
            educations: new Set(),
            types: new Set(),
          };

          content.forEach(job => {
            // 근무지역
            if (job.workRgnNmLst) {
              job.workRgnNmLst.split(',').forEach(region => {
                newOptions.regions.add(region.trim());
              });
            }
            // 분야
            if (job.ncsCdNmLst) {
              job.ncsCdNmLst.split(',').forEach(category => {
                newOptions.categories.add(category.trim());
              });
            }
            // 경력
            if (job.recruitSeNm) {
              newOptions.histories.add(job.recruitSeNm);
            }
            // 학력
            if (job.academicBgNm) {
              newOptions.educations.add(job.academicBgNm);
            }
            // 고용형태
            if (job.empTypeNm) {
              newOptions.types.add(job.empTypeNm);
            }
          });

          setFilterOptions(newOptions);
        }
      } else {
        setError(response.message || '데이터를 불러오는데 실패했습니다.');
        setJobPosts([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    } catch (error) {
      console.error('채용공고 조회 중 오류 발생:', error);
      setError('채용공고 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setJobPosts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // 필터 변경 핸들러
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setPage(1);
  };

  // 검색 핸들러
  const handleSearch = () => {
    setPage(1);
    fetchJobPosts();
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  // 필터나 페이지 변경시 API 호출
  useEffect(() => {
    fetchJobPosts();
  }, [filters, page]);

  // 초기 로딩
  useEffect(() => {
    fetchJobPosts();
  }, []);

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.searchHeader}>채용공고 상세검색</h1>

        <div className={styles.filterContainer}>
          <div className={styles.filterGrid}>
            <FilterColumn 
              title="근무지역" 
              options={['전체', ...Array.from(filterOptions.regions)]} 
              selected={filters.regionCD}
              onChange={(value) => handleFilterChange('regionCD', value)}
            />
            <FilterColumn 
              title="분야" 
              options={['전체', ...Array.from(filterOptions.categories)]} 
              selected={filters.categoryCD}
              onChange={(value) => handleFilterChange('categoryCD', value)}
            />
            <FilterColumn 
              title="경력" 
              options={['전체', ...Array.from(filterOptions.histories)]} 
              selected={filters.historyCD}
              onChange={(value) => handleFilterChange('historyCD', value)}
            />
            <FilterColumn 
              title="학력" 
              options={['전체', ...Array.from(filterOptions.educations)]} 
              selected={filters.eduCD}
              onChange={(value) => handleFilterChange('eduCD', value)}
            />
            <FilterColumn 
              title="고용형태" 
              options={['전체', ...Array.from(filterOptions.types)]} 
              selected={filters.typeCD}
              onChange={(value) => handleFilterChange('typeCD', value)}
            />
          </div>

          <div className={styles.filterFooter}>
            <div className={styles.selectedFilters}>
              {Object.entries(filters).map(([key, value]) => 
                value !== 'all' && (
                  <span key={key} onClick={() => handleFilterChange(key, 'all')}>
                    {value} ✕
                  </span>
                )
              )}
            </div>
            <div className={styles.keywordSearch}>
              <input
                type="text"
                placeholder="키워드"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch}>검색하기</button>
            </div>
          </div>
        </div>

        <div className={styles.resultSection}>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <>
              <div className={styles.resultHeader}>
                채용정보 총 {totalElements}건
                {loading && <span className={styles.loading}>로딩 중...</span>}
              </div>
              <div className={styles.cardList}>
                {jobPosts.map((job) => (
                  <RecruitmentCard 
                    key={job.id} 
                    job={{
                      title: job.recrutPbancTtl,
                      location: job.workRgnNmLst,
                      field: job.ncsCdNmLst,
                      company: job.instNm,
                      deadline: job.pbancEndYmd,
                      viewCount: job.viewCnt,
                      isScrap: job.isScarp,
                      id: job.id
                    }} 
                  />
                ))}
              </div>

              {totalPages > 0 && (
                <div className={styles.pagination}>
                  {page > 1 && (
                    <button 
                      className={styles.pageButton}
                      onClick={() => handlePageChange(1)}
                    >
                      {'<<'}
                    </button>
                  )}
                  
                  {page > 1 && (
                    <button 
                      className={styles.pageButton}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      {'<'}
                    </button>
                  )}

                  {(() => {
                    const { start, end } = calculatePageRange();
                    return Array.from({ length: end - start + 1 }).map((_, i) => {
                      const pageNum = start + i;
                      return (
                        <button 
                          key={pageNum} 
                          className={styles.pageButton}
                          onClick={() => handlePageChange(pageNum)}
                          style={{ 
                            backgroundColor: page === pageNum ? '#3b82f6' : 'white',
                            color: page === pageNum ? 'white' : 'black'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    });
                  })()}

                  {page < totalPages && (
                    <button 
                      className={styles.pageButton}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {'>'}
                    </button>
                  )}

                  {page < totalPages && (
                    <button 
                      className={styles.pageButton}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {'>>'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentNoticePage;
