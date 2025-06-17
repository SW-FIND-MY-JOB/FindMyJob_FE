import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동용 훅
import styles from './CoverLetterQuestion.module.css';
import CompanySelector from '../company/CompanySelector';
import JobSelector from '../job/JobSelector';
import { postCoverLetter } from '../../api/coverletterSave/create'; // ✅ API 함수

export default function CoverLetterQuestionForm() {
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const navigate = useNavigate(); // ✅ 페이지 이동 훅 사용

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setQuestion(value);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      setContent(value);
    }
  };

  const handleSubmit = async () => {
    if (question.length < 5 || question.length > 500) {
      alert('질문은 5자 이상 500자 이하로 입력해주세요.');
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

    try {
      const response = await postCoverLetter({
        companyName: selectedCompany,  // 백엔드에서는 instNm
        duty: selectedJob,             // 백엔드에서는 ncsCdNmLst
        question: question,            // 백엔드에서는 title
        content: content,              // 그대로
      });
      
      // API 응답에서 새로 생성된 자소서 ID 추출
      const newCoverLetterId = response.result?.id || response.result;
      
      alert('자소서가 성공적으로 작성되었습니다!');
      
      if (newCoverLetterId) {
        navigate(`/assay?id=${newCoverLetterId}`); // 새로 생성된 자소서 페이지로 이동
      } else {
        navigate('/assay'); // ID가 없으면 기본 페이지로 이동
      }
    } catch (error) {
      console.error('작성 실패:', error);
      alert('자소서 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h1 className={styles.pageTitle}>자기소개서 작성</h1>
        <div className={styles.guideMessage}>
          <strong>나의 자소서가 누군가의 길잡이가 될 수 있어요.</strong><br />
          여러분의 경험을 공유해 주세요. 누군가에게 큰 힘이 됩니다.🫶
        </div>
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
          className={styles.mainTextarea}
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
