import React, { useState } from 'react';
import { changePassword } from '../../api/myPage/myPageAPI';
import styles from './ChangePassword.module.css';
import { RiLockPasswordLine, RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await changePassword(formData);
      setSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className={styles.changePassword}>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">새 비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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
        <button type="submit" className={styles.submitBtn}>
          <RiLockPasswordLine size={18} />
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ChangePassword; 