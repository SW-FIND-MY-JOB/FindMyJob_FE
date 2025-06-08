import React from 'react';
import styles from './FilterColumn.module.css';

const FilterColumn = ({ title, options, selected, onChange }) => {
  const handleOptionClick = (opt) => {
    if (onChange) {
      onChange(opt);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.columnTitle}>{title}</div>
      <ul className={styles.optionList}>
        {options.map((opt, idx) => (
          <li
            key={idx}
            className={`${styles.option} ${selected === opt ? styles.optionSelected : ''}`}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterColumn;
