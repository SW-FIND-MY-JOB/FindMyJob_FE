import { useState } from 'react';
import styles from './CoverLetterQuestion.module.css';
import CompanySelector from '../company/CompanySelector';
import JobSelector from '../job/JobSelector';
import { postCoverLetter } from '../../api/coverletterSave/create'; // ✅ API 함수
import AiScoreModal from './AiScoreModal';

export default function CoverLetterQuestionForm() {
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [newCoverLetterId, setNewCoverLetterId] = useState(null);
  const [score, setScore] = useState(null);
  const [point, setPoint] = useState(null);
  const [percent, setPercent] = useState(null);
  const [bins, setBins] = useState(null);
  const [counts, setCounts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [getResponse, setGetResponse] = useState(false);

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

    setIsLoading(true);
    setGetResponse(false);

    try {
      const response = await postCoverLetter({
        companyName: selectedCompany,  // 백엔드에서는 instNm
        duty: selectedJob,             // 백엔드에서는 ncsCdNmLst
        question: question,            // 백엔드에서는 title
        content: content,              // 그대로
      });
      
      // API 응답에서 새로 생성된 자소서 ID 추출
      const newCoverLetterId = response.result?.id;
      // point 추출
      const point = response.result?.point;
      // score 추출
      const score = response.result?.score;
      // percent 추출
      const percent = response.result?.percent;
      // bins 추출
      const bins = response.result?.scores.bins;
      // counts 추출
      const counts = response.result?.scores.counts;

      setIsLoading(false);
      setGetResponse(true);

      setNewCoverLetterId(newCoverLetterId);
      setScore(score);
      setPoint(point);
      setPercent(percent);
      setBins(bins);
      setCounts(counts);
      setIsOpen(true);
    } catch (error) {
      console.error('작성 실패:', error);
      console.log(error.response.data.message);
      alert(`${error.response.data.message} 다시 작성해주세요.`);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      {/* 스캐닝 로딩 오버레이 */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <span className={styles.loadingText}>분석 중...</span>
        </div>
      )}
      
      {/* 분석이 끝나면 로딩창 닫고 모달창 띄움 */}
      {getResponse && !isLoading && isOpen && 
        <AiScoreModal setIsOpen={setIsOpen} 
          id={newCoverLetterId} score={score} point={point} percent={percent} bins={bins} counts={counts} />
      }
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
