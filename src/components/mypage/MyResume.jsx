import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyResumes } from '../../api/myPage/myPageAPI';
import styles from './MyResume.module.css';
import { RiAddLine, RiEyeLine, RiEditLine } from 'react-icons/ri';

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getMyResumes();
        setResumes(data);
      } catch (error) {
        console.error('자소서를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.myResume}>
      {resumes.length === 0 ? (
        <div className={styles.noResume}>
          <p>작성된 자소서가 없습니다.</p>
          <Link to="/resume/write" className={styles.writeResumeBtn}>
            <RiAddLine size={20} />
            자소서 작성하기
          </Link>
        </div>
      ) : (
        <div className={styles.resumeList}>
          {resumes.map((resume) => (
            <div key={resume.id} className={styles.resumeItem}>
              <h3>{resume.title}</h3>
              <p>작성일: {new Date(resume.createdAt).toLocaleDateString()}</p>
              <div className={styles.resumeActions}>
                <Link to={`/resume/${resume.id}`} className={styles.viewBtn}>
                  <RiEyeLine size={18} />
                  보기
                </Link>
                <Link to={`/resume/edit/${resume.id}`} className={styles.editBtn}>
                  <RiEditLine size={18} />
                  수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResume; 