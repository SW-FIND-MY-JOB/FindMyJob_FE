import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { getScrapResumes } from '../../api/myPage/myPageAPI';
import { removeCoverLetterScrap } from '../../api/coverletterGetList/getList';
import styles from './ScrapResume.module.css';
import { RiAddLine } from 'react-icons/ri';
import { useAuth } from '../../utils/AuthContext';
import LoginModal from '../login/LoginModal';

const ScrapResume = () => {
    const [resumes, setResumes] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
        size: 5,
        isFirst: true,
        isLast: false
    });
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [scrapStates, setScrapStates] = useState({});
    const navigate = useNavigate();
    const { isLogin } = useAuth();

    const fetchResumes = async (page) => {
        try {
            const response = await getScrapResumes(page, 5);
            setResumes(response.resumes);
            setPagination(response.pagination);
            
            // 모든 스크랩 상태를 true로 초기화 (스크랩된 목록이므로)
            const initialScrapStates = {};
            response.resumes.forEach(resume => {
                initialScrapStates[resume.id] = true;
            });
            setScrapStates(initialScrapStates);
            
            setError(null);
        } catch (err) {
            setError('자소서를 불러오는데 실패했습니다.');
            console.error('자소서 조회 실패:', err);
        }
    };

    useEffect(() => {
        fetchResumes(1);
    }, []);

    const handlePageChange = (newPage) => {
        fetchResumes(newPage);
    };

    const handleView = (resumeId) => {
        navigate(`/assay?id=${resumeId}`);
    };

    const handleBookmarkClick = async (resumeId, event) => {
        event.stopPropagation(); // 행 클릭 이벤트 전파 방지

        if (!isLogin) {
            setShowLoginModal(true);
            return;
        }

        try {
            // 스크랩 해제 (스크랩 목록에서는 항상 해제만 가능)
            await removeCoverLetterScrap(resumeId);
            
            // 로컬 상태 업데이트
            setScrapStates(prev => ({
                ...prev,
                [resumeId]: false
            }));

            // 목록에서 제거하기 위해 새로고침
            setTimeout(() => {
                if (resumes.length === 1 && pagination.currentPage > 1) {
                    fetchResumes(pagination.currentPage - 1);
                } else {
                    fetchResumes(pagination.currentPage);
                }
            }, 500);

        } catch (error) {
            console.error('스크랩 해제 실패:', error);  
            const errorMessage = error.response?.data?.message || '스크랩 해제에 실패했습니다.';
            alert(errorMessage);
        }
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>&emsp;스크랩한 자소서</h2>
            </div>
            
            {resumes.length === 0 ? (
                <div className={styles.noResume}>
                    <p>스크랩한 자소서가 없습니다.</p>
                    {isLogin ? (
                        <button onClick={() => navigate('/cover-letter-search')} className={styles.writeResumeBtn}>
                            <RiAddLine size={20} />
                            자소서 둘러보기
                        </button>
                    ) : (
                        <button onClick={() => setShowLoginModal(true)} className={styles.writeResumeBtn}>
                            <RiAddLine size={20} />
                            자소서 둘러보기
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <table className={styles.resumeTable}>
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>기업명</th>
                                <th>직무명</th>
                                <th>자소서 질문/내용</th>
                                <th>조회수</th>
                                <th>스크랩</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.map((resume, idx) => (
                                <tr key={resume.id} onClick={() => handleView(resume.id)} className={styles.resumeRow}>
                                    <td>{pagination.totalElements - ((pagination.currentPage - 1) * pagination.size) - idx}</td>
                                    <td>{resume.instNm}</td>
                                    <td>{resume.ncsCdNmLst}</td>
                                    <td className={styles.titleCell}>
                                        <div className={styles.resumeTitle}>1. {resume.title}</div>
                                        <div className={styles.resumeContent}>
                                            {resume.content && resume.content.length > 50 ? `${resume.content.slice(0, 50)}...` : resume.content || '내용 없음'}
                                        </div>
                                    </td>
                                    <td>{resume.viewCnt}</td>
                                    <td className={styles.bookmarkCell}>
                                        <button
                                            className={`${styles.bookmarkButton} ${scrapStates[resume.id] ? styles.bookmarked : ''}`}
                                            onClick={(e) => handleBookmarkClick(resume.id, e)}
                                            title="스크랩 해제"
                                        >
                                            <Bookmark 
                                                size={24} 
                                                fill={scrapStates[resume.id] ? '#007aff' : 'none'}
                                                color={scrapStates[resume.id] ? '#007aff' : '#ccc'}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.footer}>
                        <div className={styles.pagination}>
                        {[...Array(pagination.totalPages)].map((_, index) => (
                            <button
                            key={index + 1}
                            className={`${styles.pageButton} ${
                                pagination.currentPage === index + 1 ? styles.active : ''
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                            >
                            {index + 1}
                            </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
    );
};

export default ScrapResume; 