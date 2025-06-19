import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CoverLetterPage.module.css';
import CoverLetterMain from '../../components/cover-letter/CoverLetterMain';
import CoverLetterList from '../../components/cover-letter/CoverLetterList';
import { fetchCoverLetterDetail } from '../../api/coverletterGetList/getList';
import { useAuth } from '../../utils/AuthContext';

export default function CoverLetterPage() {
  const [searchParams] = useSearchParams();
  const [coverLetterData, setCoverLetterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLogin } = useAuth();
  
  const coverLetterId = searchParams.get('id');

  useEffect(() => {
    const loadCoverLetterDetail = async () => {
      if (!coverLetterId) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCoverLetterDetail(coverLetterId, isLogin);
        setCoverLetterData(data);
      } catch (error) {
        console.error('자소서 상세 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCoverLetterDetail();
  }, [coverLetterId, isLogin]);

  // if (loading) {
  //   return (
  //     <div className={styles.pageContainer}>
  //       <div className={styles.loading}>로딩중...</div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <CoverLetterMain coverLetterData={coverLetterData} />
        <CoverLetterList recentInformList={coverLetterData?.recentInformList} />
      </div>
    </div>
  );
}
