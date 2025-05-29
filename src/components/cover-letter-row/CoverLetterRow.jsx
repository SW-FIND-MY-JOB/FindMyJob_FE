import styles from './CoverLetterRow.module.css';

export default function CoverLetterRow({ item, index }) {
  const { title, company, job, question, content, views } = item;

  return (
    <tr className={styles.row}>
      <td>{index + 1}</td>
      <td>{company}</td>
      <td>{job}</td>
      <td>{title}</td>
      <td>
        <strong>{question}</strong><br />
        <span className={styles.snippet}>{content}</span>
      </td>
      <td>{views}</td>
      <td>🔖</td>
    </tr>
  );
}
