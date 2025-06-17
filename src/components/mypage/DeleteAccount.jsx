import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../api/myPage/myPageAPI';
import { logoutRequest } from '../../api/authService/authAPI';
import { useAuth } from '../../utils/AuthContext';
import styles from './DeleteAccount.module.css';
import { RiUserUnfollowLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await deleteAccount(password);
      setSuccess('회원정보가 성공적으로 삭제되었습니다.');
      setPassword('');
      
      // 회원탈퇴 성공 시 자동 로그아웃 처리
      setTimeout(async () => {
        try {
          await logoutRequest(); // 서버에 로그아웃 요청
        } catch (logoutError) {
          console.log('로그아웃 요청 실패:', logoutError);
        } finally {
          logout(); // 로컬 상태 초기화
          alert('회원탈퇴가 완료되었습니다. 메인 페이지로 이동합니다.');
          navigate('/'); // 메인 페이지로 리다이렉트
        }
      }, 2000); // 2초 후 자동 로그아웃
    } catch (error) {
      setError(error.response?.data?.message || '회원정보 삭제에 실패했습니다.');
    }
  };

  return (
    <div className={styles.deleteAccount}>
      <div className={styles.deleteAccountInner}>
        <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>
            <RiUserUnfollowLine className={styles.titleIcon} />
            회원 탈퇴
          </div>
        </div>
        <p className={styles.warning}>
          <RiErrorWarningLine size={20} />
          회원을 탈퇴하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className={styles.errorMessage}>
              <RiErrorWarningLine size={18} />
              {error}
            </div>
          )}
          {success && (
            <div className={styles.successMessage}>
              <RiCheckLine size={18} />
              {success}
            </div>
          )}
          <button type="submit" className={styles.deleteBtn}>
            <RiUserUnfollowLine size={18} />
            회원 탈퇴
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount; 