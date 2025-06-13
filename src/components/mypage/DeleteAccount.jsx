import React, { useState } from 'react';
import { deleteAccount } from '../../api/myPage/myPageAPI';
import styles from './DeleteAccount.module.css';
import { RiUserUnfollowLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await deleteAccount(password);
      setSuccess('계정이 성공적으로 삭제되었습니다.');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.message || '계정 삭제에 실패했습니다.');
    }
  };

  return (
    <div className={styles.deleteAccount}>
      <h2>계정 삭제</h2>
      <p className={styles.warning}>
        <RiErrorWarningLine size={20} />
        계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
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
          계정 삭제
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount; 