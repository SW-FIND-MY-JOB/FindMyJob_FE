import { useState } from 'react';
import styles from './CoverLetterQuestion.module.css';
import CompanySelector from './CompanySelector';
import JobSelector from './JobSelector';

export default function CoverLetterQuestionForm() {
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setQuestion(value);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      setContent(value);
    }
  };

  const handleSubmit = () => {
    if (question.length < 5 || question.length > 100) {
      alert('질문은 5자 이상 100자 이하로 입력해주세요.');
      return;
    }
    if (content.length < 100 || content.length > 2000) {
      alert('내용은 100자 이상 2000자 이하로 입력해주세요.');
      return;
    }
    if (!selectedCompany) {
      alert('기업명을 선택해주세요.');
      return;
    }
    if (!selectedJob) {
      alert('직무를 선택해주세요.');
      return;
    }

    alert('제출되었습니다!');
    // TODO: 제출 처리
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <label className={styles.label}>질문</label>
        <input
          type="text"
          className={styles.input}
          placeholder="질문을 입력하세요."
          value={question}
          onChange={handleQuestionChange}
        />
        <div className={styles.charCount}>{question.length}자</div>

        <label className={styles.label}>내용</label>
        <textarea
          className={styles.mainTextarea} // ✅ 여기만 변경됨
          placeholder="내용을 입력하세요."
          value={content}
          onChange={handleContentChange}
        />
        <div className={styles.charCount}>{content.length}자</div>

        <div className={styles.actionRow}>
          <div className={styles.leftButtons}>
            <CompanySelector onSelect={setSelectedCompany} />
            <JobSelector onSelect={setSelectedJob} />
          </div>
          <div className={styles.submitAlignRight}>
            <button className={styles.submitButton} onClick={handleSubmit}>
              발행
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
