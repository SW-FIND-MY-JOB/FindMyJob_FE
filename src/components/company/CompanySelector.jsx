import { useState, useEffect, useRef } from 'react';
import { Building2 } from 'lucide-react';
import styles from './CompanySelector.module.css';
import companyList from '../../data/company.json';

export default function CompanySelector({ onSelect, direction = 'up' }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const wrapperRef = useRef(null);

  const filtered = companyList.filter((name) => name.includes(query));

  const handleSelect = (name) => {
    setSelected(name);
    setQuery(name);
    setShowDropdown(false);
    if (onSelect) onSelect(name);
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
        <Building2 size={18} />
        <span>{selected || '기업명 선택'}</span>
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
            {filtered.map((name, i) => (
              <li
                key={i}
                className={styles.dropdownItem}
                onClick={() => handleSelect(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
