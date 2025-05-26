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

  const [scrapped, setScrapped] = useState(false); // ⭐ 즐겨찾기 상태

  useEffect(() => {
    const dummy = {
      company: '한국전력',
      position: '개발',
      views: 10,
      question: '지원동기 (300자)',
      content: `한국전력은 단순한 전력 공급 기관을 넘어, 국가 에너지 정책의 중심축으로서 대한민국의 지속 가능한 발전에 핵심적인 역할을 수행하는 기관이라 생각합니다. 특히 스마트그리드, 전력 데이터 플랫폼, 그리고 탄소중립 실현을 위한 에너지 전환 기술 개발 등은 저의 기술 역량과 가치 지향이 일치하는 분야입니다. 국민 생활에 실질적인 영향을 미치는 서비스를 기술로 구현하는 데 관심이 많았기에, 공공성과 기술 전문성을 동시에 갖춘 한국전력에 지원하게 되었습니다.

저는 학부에서 컴퓨터공학을 전공하며 다양한 실무형 프로젝트를 수행하며 개발자로서의 역량을 다져왔습니다. 특히 백엔드 시스템 설계와 대용량 데이터 처리에 흥미를 느껴 관련 기술을 집중적으로 공부했고, 프로젝트 경험을 통해 이를 실제 구현해보았습니다. 졸업 프로젝트에서는 에너지 소비 데이터를 활용한 시각화 서비스 플랫폼을 기획하고, 공공 API를 활용해 실시간 데이터를 수집하여 사용자 친화적으로 시각화하는 기능을 구현한 경험이 있습니다.

이 과정에서 데이터 수집부터 가공, 저장, 프론트엔드 API 제공까지 전체 백엔드 파이프라인을 직접 설계하고 운영하였습니다. 서버는 Spring Boot 기반으로 구성하고, DB는 MariaDB를 사용하였으며, Swagger를 통해 문서화 및 테스트를 진행했습니다. 또한 RESTful API 구조를 적용하여 클라이언트와의 통신 안정성을 높였고, JWT 기반 인증을 도입하여 보안성과 편의성을 동시에 고려했습니다. 실사용자 피드백을 반영하여 시스템 구조를 개선해가는 과정에서 사용자 중심 개발의 중요성도 깨달았습니다.

또한 학부 과정 중 팀 프로젝트에서 경험한 장애 대응은 저에게 중요한 전환점이 되었습니다. 프로젝트 중 발생한 갑작스러운 API 응답 지연 문제를 로그 기반으로 분석하고, 비동기 처리와 캐싱 도입을 통해 문제를 해결하며 성능을 40% 이상 개선했던 경험이 있습니다. 이 경험을 통해 문제 상황을 두려워하기보다는, 침착하게 원인을 분석하고 구조적으로 해결하는 태도의 중요성을 체득했습니다. 이는 공공 시스템처럼 안정성이 중요한 환경에서 매우 중요한 역량이라 생각합니다.

교내 알고리즘 스터디 활동을 통해 기초적인 CS 이론과 자료구조에 대한 이해도 꾸준히 다져왔습니다. 프로그래머스와 백준을 활용하여 실전 문제를 풀었고, 이를 통해 로직 최적화, 예외 상황 처리 능력을 키울 수 있었습니다. 또한 Git과 Jira를 활용한 협업 방식에 익숙하며, 팀원들과의 커뮤니케이션 과정에서 발생하는 충돌을 조율하고 문서화하는 역할도 자주 수행했습니다. 협업 능력은 실제 업무에서도 중요하다고 생각하며, 이를 체계적으로 키워왔습니다.

개발 외적으로는 에너지 관련 교내 학회에 참여하여 다양한 산업 보고서와 기술 자료를 분석하고, 관련 세미나를 주기적으로 기획하며 기술과 사회의 연결성에 대한 통찰력을 기를 수 있었습니다. 특히 RE100, 탄소배출권, ESS(에너지 저장 장치) 등 최신 이슈에 관심을 가지며, 단순한 기술자가 아닌 업계 전반을 이해하는 개발자가 되어야겠다는 목표를 세웠습니다. 한국전력의 디지털 전환 전략은 이러한 저의 방향성과 매우 부합한다고 느꼈습니다.

입사 후에는 한국전력의 전력정보시스템, 수요예측 시스템 등 주요 내부 시스템의 구조를 빠르게 이해하고, 백엔드 개발자로서의 기본적인 역할부터 충실히 수행하겠습니다. 로그 기반의 장애 대응, 모니터링 시스템 구성, 성능 튜닝 등 실무적인 업무 역량을 키우는 데 집중하겠습니다. 동시에 유관 부서와의 협업 과정에서 도메인 지식을 넓히고, 데이터를 기반으로 한 의사결정 보조 도구 설계에 기여하고 싶습니다.

장기적으로는 클라우드 인프라와 DevOps 자동화에도 참여하여 전체 시스템의 운영 효율성을 개선하고, 다양한 부서의 요구사항을 반영하는 통합형 백엔드 시스템을 설계할 수 있는 개발자로 성장하고자 합니다. 더불어, 신규 시스템 구축 시 초기 아키텍처 설계부터 유지보수 체계까지 총괄할 수 있는 능력을 기르고 싶습니다. 변화하는 에너지 산업 환경에서 끊임없이 학습하고 적응하는 자세로 임하겠습니다.

공공기관 개발자로서 기술적 역량뿐 아니라, 국민을 위한 서비스라는 사명감을 바탕으로 일하고 싶습니다. 한국전력이 추진하는 디지털 혁신 과제에 제가 가진 실전형 개발 경험과 지속적인 학습 태도가 기여할 수 있을 것이라 확신합니다. 기술과 가치, 그리고 사람을 연결하는 개발자가 되어, 국민 생활의 질을 높이는 데 작지만 실질적인 역할을 하고 싶습니다.
`

    };
    setCoverLetter(dummy);
  }, []);

  const toggleScrap = () => {
    setScrapped((prev) => !prev);
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>자기소개서</h2>
        <button
          className={`${styles.scrapButton} ${scrapped ? styles.active : ''}`}
          onClick={toggleScrap}
        >
          {scrapped ? '★ 스크랩됨' : '☆ 스크랩'}
        </button>
      </div>

      <div className={styles.headerRow}>
        <p className={styles.subtitle}>{coverLetter.company} / {coverLetter.position}</p>
        <div className={styles.metaActions}>
          <span className={styles.views}>조회수: {coverLetter.views}</span>
          {/* <span className={styles.divider}>|</span>
          <span className={styles.action}>수정</span> */}
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
