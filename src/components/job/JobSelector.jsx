import { useState, useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';
import styles from './JobSelector.module.css';
import dutyList from '../../data/duty.json';

export default function JobSelector({ onSelect, direction = 'up' }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const wrapperRef = useRef(null);

  const filtered = ['모두보기', ...dutyList.filter((job) => job.includes(query))];

  const handleSelect = (job) => {
    setSelected(job);
    setQuery(job === '모두보기' ? '' : job);
    setShowDropdown(false);
    if (onSelect) onSelect(job === '모두보기' ? '' : job);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectorWrapper} ref={wrapperRef}>
      <button className={styles.tagButton} onClick={() => setShowDropdown(!showDropdown)}>
        <Briefcase size={18} />
        <span>{selected || '직무 선택'}</span>
      </button>

      {showDropdown && (
        <div className={`${styles.dropdownBox} ${direction === 'down' ? styles.down : styles.up}`}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="검색하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            {query && (
              <button className={styles.clearButton} onClick={() => setQuery('')}>
                ×
              </button>
            )}
          </div>

          <ul className={styles.dropdownList}>
            {filtered.map((job) => (
              <li
                key={job}
                className={styles.dropdownItem}
                onClick={() => handleSelect(job)}
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
