
import { useEffect, useState } from 'react';
import styles from './CoverLetterList.module.css';

export default function CoverLetterList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const dummyList = [
      {
        id: 1,
        company: '네이버',
        position: '백엔드 개발',
        preview: '대용량 트래픽 처리 경험과 마이크로서비스 설계 능력을 기반으로...',
      },
      {
        id: 2,
        company: '카카오엔터프라이즈',
        position: 'AI 엔지니어',
        preview: '자연어 처리 프로젝트 경험과 GPT API 연동 프로젝트를 수행하며...',
      },
      {
        id: 3,
        company: '한국전력',
        position: '개발',
        preview: '스마트그리드와 전력 데이터 관리 시스템에 대한 관심을 가지고...',
      },
      {
        id: 4,
        company: '삼성전자',
        position: '펌웨어 개발',
        preview: '임베디드 시스템 기반의 제어 소프트웨어 개발 프로젝트 경험으로...',
      },
      {
        id: 5,
        company: '현대오토에버',
        position: '클라우드 인프라',
        preview: '클라우드 기반 인프라 설계 및 IaC 도입 경험을 통해...',
      },
      {
        id: 6,
        company: 'LG CNS',
        position: '데이터 엔지니어',
        preview: 'ETL 파이프라인 구축과 데이터 웨어하우스 최적화 경험이 있습니다.',
      },
      {
        id: 7,
        company: '쿠팡',
        position: '프론트엔드 개발',
        preview: 'React 기반 대규모 커머스 플랫폼에서의 UI/UX 최적화 경험으로...',
      },
      {
        id: 8,
        company: '배달의민족',
        position: '백엔드 개발자',
        preview: '배달 데이터 분석과 주문 처리 시스템 개선에 참여하며...',
      },
      {
        id: 9,
        company: '토스',
        position: '모바일 앱 개발',
        preview: 'Flutter를 활용한 금융 앱 개발과 사용자 인터페이스 고도화 경험...',
      },
      {
        id: 10,
        company: '라인플러스',
        position: '보안 엔지니어',
        preview: '침해사고 대응 경험과 보안 시스템 로그 분석 경험을 바탕으로...',
      },
      // 필요 시 더 추가 가능
    ];

    setList(dummyList);
  }, []);

  const handleClick = (id) => {
    alert(`자소서 ID ${id} 클릭됨`);
  };

  return (
    <div className={styles.listSection}>
      <h4 className={styles.listTitle}>다른 자소서</h4>
      <div className={styles.scrollArea}>
        {list.map((item) => (
          <div
            key={item.id}
            className={styles.listItem}
            onClick={() => handleClick(item.id)}
          >
            <strong>{item.company} / {item.position}</strong>
            <p>{item.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
