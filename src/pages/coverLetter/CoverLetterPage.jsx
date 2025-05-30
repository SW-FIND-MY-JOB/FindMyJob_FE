import styles from './CoverLetterPage.module.css';
import CoverLetterMain from '../../components/cover-letter/CoverLetterMain';
import CoverLetterList from '../../components/cover-letter/CoverLetterList';

export default function CoverLetterPage() {
  return (
    // src/pages/coverLetter/CoverLetterPage.jsx
<div className={styles.pageContainer}>
  <div className={styles.mainContent}>
    <CoverLetterMain />
    <CoverLetterList />
  </div>
</div>

  );
}
