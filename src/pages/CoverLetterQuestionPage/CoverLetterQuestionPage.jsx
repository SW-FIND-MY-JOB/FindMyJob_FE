import styles from './CoverLetterQuestionPage.module.css';
import CoverLetterQuestionForm from '../../components/Cover-Letter-Question/CoverLetterQuestionForm';

export default function CoverLetterQuestionPage() {
  return (
    <div className={styles.pageWrapper}>
      <CoverLetterQuestionForm />
    </div>
  );
}
