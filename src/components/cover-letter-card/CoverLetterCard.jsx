import styles from './CoverLetterCard.module.css';

export default function CoverLetterCard({ data }) {
  const { company, job, snippet } = data;

  return (
    <div className={styles.card}>
      <h3 className={styles.company}>{company}</h3>
      <p className={styles.job}>{job}</p>
      <p className={styles.snippet}>{snippet}</p>
    </div>
  );
}
