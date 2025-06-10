// src/components/cover-letter-row/CoverLetterRow.jsx
import styles from './CoverLetterRow.module.css';

export default function CoverLetterRow({ item, index }) {
  return (
    <tr className={styles.row}>
      <td>{index + 1}</td>
      <td>{item.instNm}</td>
      <td>{item.ncsCdNmLst}</td>
      <td>
        <div>
          <strong>{item.title}</strong>
          <div className={styles.snippet}>{item.content}</div>
        </div>
      </td>
      <td>{item.viewCnt ?? 0}</td>
      <td>{item.isScrap ? '✔' : '-'}</td>
    </tr>
  );
}
