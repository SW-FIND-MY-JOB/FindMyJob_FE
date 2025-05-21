import { useEffect, useState } from 'react';
import styles from './CoverLetterMain.module.css';

export default function CoverLetterMain() {
  const [coverLetter, setCoverLetter] = useState({
    company: '',
    position: '',
    views: 0,
    question: '',
    content: ''
  });

  useEffect(() => {
    const dummy = {
      company: '한국전력',
      position: '개발',
      views: 10,
      question: '지원동기 (300자)',
      content: `한국전력은 탄소중립 시대를 선도하는 국가 기반 공기업으로서, 안정적인 전력 공급뿐 아니라 디지털 기술을 활용한 에너지 전환을 주도하고 있다고 생각합니다. 특히 스마트그리드, 전력 데이터 플랫폼, 신재생 에너지 관리 시스템 등 다양한 분야에서 소프트웨어 개발의 역할이 확대되고 있다는 점에 매력을 느꼈습니다.

저는 컴퓨터공학을 전공하며 백엔드 기반의 시스템 개발 프로젝트에 다수 참여하였고, 팀원들과의 협업을 통해 REST API 설계, 데이터베이스 모델링, 장애 대응 로직 등을 구현한 경험이 있습니다. 또한 공공 API를 연동한 전력 소비량 시각화 서비스도 직접 개발한 바 있습니다.

이러한 경험을 바탕으로 한국전력의 개발 직무에서 전력 데이터의 효율적 활용과 디지털 서비스 구축에 기여하고 싶습니다. 국민의 삶의 질을 높이고 국가 전력 시스템의 스마트화를 함께 이끌어가고 싶어 지원하게 되었습니다.`
    };

    setCoverLetter(dummy);
  }, []);

  return (
    <div className={styles.mainSection}>
      <h2 className={styles.title}>자기소개서</h2>

      <div className={styles.headerRow}>
        <p className={styles.subtitle}>{coverLetter.company} / {coverLetter.position}</p>
        <div className={styles.metaActions}>
          <span className={styles.views}>조회수: {coverLetter.views}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.action}>수정</span>
          <span className={styles.divider}>/</span>
          <span className={styles.action}>삭제</span>
        </div>
      </div>

      <div className={styles.questionBlock}>
        <h4 className={styles.label}>질문</h4>
        <p className={styles.question}>{coverLetter.question}</p>
      </div>

      <h4 className={styles.label}>내용</h4>
      <div className={styles.content}>
        {coverLetter.content.split('\n').map((line, index) => (
          <p key={index} className={styles.paragraph}>{line}</p>
        ))}
      </div>
    </div>
  );
}
