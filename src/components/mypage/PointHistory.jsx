import styles from './PointHistory.module.css';
import { getPointHistory } from '../../api/myPage/myPageAPI';
import React, { useState, useEffect } from 'react';

export default function PointHistory() {
    const [pointHistory, setPointHistory] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
        size: 10,
        isFirst: true,
        isLast: true
    });

    // 포인트 내역 조회
    const fetchPointHistory = async (page = 1) => {
        try {
            const data = await getPointHistory(page, pagination.size);
            if (data) {
                setPointHistory(data.pointHistory);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('포인트 내역 조회 에러:', error);
        }
    };

    useEffect(() => {
        fetchPointHistory(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (page) => {
        if (page !== pagination.currentPage) {
            fetchPointHistory(page);
        }
    };

    // 포인트 변동 값을 "+300" 또는 "-500" 형식으로 변환
    const formatPoint = (isAdd, value) => `${isAdd ? '+' : ''}${value}`;

    // 날짜 포맷 (YYYY-MM-DD HH:MM)
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>&emsp;포인트 내역</h2>
            </div>

            {pointHistory.length === 0 ? (
                <div className={styles.noHistory}>
                    <p>포인트 내역이 없습니다.</p>
                </div>
            ) : (
                <>
                    <table className={styles.pointTable}>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>내용</th>
                                <th>변동 포인트</th>
                                <th>잔액</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pointHistory.map((history, idx) => (
                                <tr key={history.id} className={styles.row}>
                                    <td>{
                                        pagination.totalElements - ((pagination.currentPage - 1) * pagination.size) - idx
                                    }</td>
                                    <td className={styles.descriptionCell}>{history.description}</td>
                                    <td
                                        className={history.isAddPoint ? styles.addPoint : styles.usePoint}
                                    >
                                        {formatPoint(history.isAddPoint, history.updatePoint)}
                                    </td>
                                    <td>{history.balance}</td>
                                    <td>{formatDate(history.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.footer}>
                        <div className={styles.pagination}>
                            {[...Array(pagination.totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`${styles.pageButton} ${pagination.currentPage === index + 1 ? styles.active : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}