import React, { useState } from 'react';
import { changePassword } from '../../api/myPage/myPageAPI';
import styles from './ChangePassword.module.css';
import { RiLockPasswordLine, RiCheckLine, RiErrorWarningLine, RiEyeLine, RiEyeOffLine, RiShieldLine } from 'react-icons/ri';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: '',
    class: ''
  });

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return { score: 0, text: '', class: '', show: false };
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 3) {
      return {
        score: strength,
        text: '약함 - 더 복잡한 비밀번호를 사용하세요',
        class: 'strengthWeak',
        show: true
      };
    } else if (strength < 5) {
      return {
        score: strength,
        text: '보통 - 특수문자를 추가하면 더 안전해요',
        class: 'strengthMedium',
        show: true
      };
    } else {
      return {
        score: strength,
        text: '강함 - 안전한 비밀번호입니다!',
        class: 'strengthStrong',
        show: true
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 새 비밀번호의 강도를 실시간으로 체크
    if (name === 'newPassword') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('더 강한 비밀번호를 설정해주세요.');
      return;
    }

    try {
      await changePassword(formData);
      setSuccess('비밀번호가 성공적으로 변경되었습니다!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStrength({ score: 0, text: '', class: '', show: false });
    } catch (error) {
      setError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className={styles.changePassword}>
      {/* 플로팅 도형들 */}
      <div className={styles.floatingShapes}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>

      <div className={styles.passwordContainer}>
        {/* 페이지 헤더 */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {/* <span className={styles.titleIcon}>🔐</span> */}
            비밀번호 변경
          </h1>
          <p className={styles.pageSubtitle}>보안을 위해 정기적으로 비밀번호를 변경해 주세요</p>
        </div>

        {/* 폼 카드 */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {/* 현재 비밀번호 */}
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="현재 사용 중인 비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPassword.current ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">새 비밀번호</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="새로운 비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPassword.new ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {/* 비밀번호 강도 표시 */}
              {passwordStrength.show && (
                <div className={`${styles.passwordStrength} ${styles.show} ${styles[passwordStrength.class]}`}>
                  <div className={styles.strengthBar}>
                    <div className={styles.strengthFill}></div>
                  </div>
                  <div className={styles.strengthText}>{passwordStrength.text}</div>
                </div>
              )}
            </div>

            {/* 새 비밀번호 확인 */}
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPassword.confirm ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className={styles.errorMessage}>
                <RiErrorWarningLine size={18} />
                {error}
              </div>
            )}

            {/* 성공 메시지 */}
            {success && (
              <div className={styles.successMessage}>
                <RiCheckLine size={18} />
                {success}
              </div>
            )}

            {/* 보안 팁 */}
            <div className={styles.securityTips}>
              <h3><RiShieldLine /> 보안 권장사항</h3>
              <ul>
                <li>8자 이상의 영문, 숫자, 특수문자 조합</li>
                <li>개인정보(이름, 생년월일 등) 사용 금지</li>
                <li>다른 사이트와 다른 비밀번호 사용</li>
                <li>정기적인 비밀번호 변경 (3-6개월)</li>
              </ul>
            </div>

            {/* 제출 버튼 */}
            <button type="submit" className={styles.submitBtn}>
              🔒 비밀번호 변경
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 