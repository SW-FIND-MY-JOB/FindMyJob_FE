import { useEffect, useRef } from 'react';
import styles from './MyContent.module.css';

export default function MyContent({question, content, selectedContent, isModalOpen, setQuestion, setContent}){
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

    useEffect(() => {
      const storageQuestion = localStorage.getItem('question');
      const storageContent = localStorage.getItem('content');

      if(storageQuestion != null){
        setQuestion(storageQuestion);
      }

      if(storageContent != null){
        setContent(storageContent);
      }
    }, [])

    const handleQuestionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setQuestion(value);
      //로컬 스토리지에 저장
      localStorage.setItem('question', value);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      setContent(value);
      //로컬 스토리지에 저장
      localStorage.setItem('content', value);
    }
  };

  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  //하이라이팅 함수
  const getHighlightedText = (text, highlight) => {
    if (!highlight || !text.includes(highlight)) return text;
    const parts = text.split(highlight);
    return parts.reduce((acc, part, i) =>
      i < parts.length - 1
        ? [...acc, part, <mark key={i}>{highlight}</mark>]
        : [...acc, part]
    , []);
  };

  const highlightedText = getHighlightedText(content, selectedContent);

  return(
      <div className={styles.myContentContainer}>
        <h2 style={{margin: '0 0 40px 0'}}>AI 자소서 코칭</h2>

        <p className={styles.pStyle}>질문</p>
        <input
            type='text'
            className={styles.questionInput}
            placeholder='질문을 입력하세요.'
            value={question}
            onChange={handleQuestionChange}
        />
        <div className={styles.questionCharCount}>{question.length}/500자</div>

        <p className={styles.pStyle}>내용</p>

        <div className={styles.highlightWrapper}>
          {/* AI자소서 피드백 모달창이 열려있으면 하이라이트 처리 */}
          {isModalOpen &&
            <div
              ref={highlightRef}
              className={styles.highlightedContentLayout}
            >
              <div className={styles.highlightedContent}>
                {highlightedText}
              </div>
            </div>
          }
          <textarea
              ref={textareaRef}
              className={styles.mainTextarea}
              placeholder="내용을 입력하세요."
              value={content}
              onChange={handleContentChange}
              spellCheck="false"
              onScroll={handleScroll}
          />
        </div>
        <div className={styles.contentCharCount}>{content.length}/2000자</div>
      </div>
  );
}