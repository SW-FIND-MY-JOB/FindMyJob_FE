// 🔁 리팩토링된 FilterColumn.jsx (코드값 기반 필터)

import React, { useState } from 'react';
import styles from './FilterColumn.module.css';

const STATIC_FILTERS = {
  regions: [
    { label: '서울', value: 'R3010' },
    { label: '부산', value: 'R3014' },
    { label: '경기', value: 'R3017' },
    { label: '인천', value: 'R3011' },
    { label: '대구', value: 'R3013' },
    { label: '광주', value: 'R3015' },
    { label: '울산', value: 'R3016' },
    { label: '강원', value: 'R3018' },
    { label: '충남', value: 'R3019' },
    { label: '충북', value: 'R3020' },
    { label: '전북', value: 'R3024' },
    { label: '전남', value: 'R3023' },
    { label: '경북', value: 'R3021' },
    { label: '경남', value: 'R3022' },
    { label: '제주', value: 'R3025' },
    { label: '세종', value: 'R3026' },
  ],
  categories: [
    { label: '보건.의료', value: 'R600006' },
    { label: '정보통신', value: 'R600020' },
    { label: '건설', value: 'R600014' },
    { label: '기계', value: 'R600015' },
    { label: '환경.에너지.안전', value: 'R600023' },
    { label: '사회복지.종교', value: 'R600007' },
    { label: '문화.예술.디자인.방송', value: 'R600008' },
  ],
  histories: [
    { label: '신입', value: 'R2010' },
    { label: '경력', value: 'R2020' },
    { label: '신입+경력', value: 'R2030' },
  ],
  educations: [
    { label: '학력무관', value: 'R7010' },
    { label: '중졸이하', value: 'R7020' },
    { label: '고졸', value: 'R7030' },
    { label: '대졸(2~3년)', value: 'R7040' },
    { label: '대졸(4년)', value: 'R7050' },
    { label: '석사', value: 'R7060' },
    { label: '박사', value: 'R7070' },
  ],
  types: [
    { label: '정규직', value: 'R1010' },
    { label: '무기계약직', value: 'R1030' },
    { label: '비정규직', value: 'R1040' },
    { label: '청년인턴(체험형)', value: 'R1060' },
  ]
};

const FilterOption = ({ title, options, selected, onChange }) => {
  const handleOptionClick = (value) => {
    const isSelected = selected.includes(value);
    onChange(isSelected ? selected.filter(v => v !== value) : [...selected, value]);
  };

  return (
    <div className={styles.filterColumn}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.optionList}>
        {options.map(({ label, value }) => (
          <li
            key={value}
            className={`${styles.option} ${selected.includes(value) ? styles.optionSelected : ''}`}
            onClick={() => handleOptionClick(value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    workRgnNm: [], ncsCdNm: [], recrutSeNm: [], acbgCondNm: [], hireTypeNm: []
  });
  const [keyword, setKeyword] = useState('');

  const handleFilterChange = (type, newValue) => {
    setFilters(prev => ({ ...prev, [type]: newValue }));
  };

  const handleSearch = () => {
    const searchParams = { page: 1, size: 40 };
    if (filters.workRgnNm.length) searchParams.regionCD = filters.workRgnNm;
    if (filters.ncsCdNm.length) searchParams.categoryCD = filters.ncsCdNm;
    if (filters.recrutSeNm.length) searchParams.historyCD = filters.recrutSeNm;
    if (filters.acbgCondNm.length) searchParams.eduCD = filters.acbgCondNm;
    if (filters.hireTypeNm.length) searchParams.typeCD = filters.hireTypeNm;
    if (keyword.trim()) searchParams.keyword = keyword.trim();
    onFilterChange(searchParams);
  };

  const getLabel = (value, type) => {
    // 필터 타입을 STATIC_FILTERS 키로 매핑
    const typeMapping = {
      workRgnNm: 'regions',
      ncsCdNm: 'categories',
      recrutSeNm: 'histories',
      acbgCondNm: 'educations',
      hireTypeNm: 'types'
    };
    
    const staticFilterKey = typeMapping[type];
    if (!staticFilterKey || !STATIC_FILTERS[staticFilterKey]) {
      return value; // 매핑되지 않으면 원본 값 반환
    }
    
    const found = STATIC_FILTERS[staticFilterKey].find(opt => opt.value === value);
    return found ? found.label : value;
  };

  const handleRemoveFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(v => v !== value)
    }));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGrid}>
        <FilterOption title="근무지역" options={STATIC_FILTERS.regions} selected={filters.workRgnNm} onChange={(v) => handleFilterChange('workRgnNm', v)} />
        <FilterOption title="분야" options={STATIC_FILTERS.categories} selected={filters.ncsCdNm} onChange={(v) => handleFilterChange('ncsCdNm', v)} />
        <FilterOption title="경력" options={STATIC_FILTERS.histories} selected={filters.recrutSeNm} onChange={(v) => handleFilterChange('recrutSeNm', v)} />
        <FilterOption title="학력" options={STATIC_FILTERS.educations} selected={filters.acbgCondNm} onChange={(v) => handleFilterChange('acbgCondNm', v)} />
        <FilterOption title="고용형태" options={STATIC_FILTERS.types} selected={filters.hireTypeNm} onChange={(v) => handleFilterChange('hireTypeNm', v)} />
      </div>
      <div className={styles.filterFooter}>
        <div className={styles.selectedFilters}>
          {Object.entries(filters).map(([type, values]) => (
            values.map(value => (
              <span
                key={`${type}-${value}`}
                className={styles.filterTag}
                onClick={() => handleRemoveFilter(type, value)}
              >
                {getLabel(value, type)} ✕
              </span>
            ))
          ))}
        </div>
        <div className={styles.keywordSearch}>
          <input
            type="text"
            placeholder="키워드 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>검색하기</button>
        </div>
      </div>
    </div>
  );
};

export { FilterSection };
