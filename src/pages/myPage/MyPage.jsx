import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyResume from '../../components/mypage/MyResume';
import ScrapResume from '../../components/mypage/ScrapResume';
import ChangePassword from '../../components/mypage/ChangePassword';
import DeleteAccount from '../../components/mypage/DeleteAccount';
import { getUserInfo } from '../../api/authService/authAPI';
import styles from './MyPage.module.css';
import { 
  RiFileList3Line, 
  RiBookmarkLine, 
  RiLockPasswordLine, 
  RiUserUnfollowLine,
  RiUserLine
} from 'react-icons/ri';

const MyPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('myResume');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setIsAuthenticated(true);
          setUser(userInfo);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'myResume':
        return <MyResume />;
      case 'scrapResume':
        return <ScrapResume />;
      case 'changePassword':
        return <ChangePassword />;
      case 'deleteAccount':
        return <DeleteAccount />;
      default:
        return <MyResume />;
    }
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.mypageLayout}>
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <div className={styles.userIcon}>
              <RiUserLine size={24} />
            </div>
            <div className={styles.userName}>
              {user?.name || '사용자'}님
            </div>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>
              <RiFileList3Line className={styles.menuIcon} />
              자소서
            </h3>
            <div className={styles.menuItems}>
              <button
                className={`${styles.menuItem} ${selectedComponent === 'myResume' ? styles.active : ''}`}
                onClick={() => setSelectedComponent('myResume')}
              >
                <RiFileList3Line className={styles.itemIcon} />
                내 자소서
              </button>
              <button
                className={`${styles.menuItem} ${selectedComponent === 'scrapResume' ? styles.active : ''}`}
                onClick={() => setSelectedComponent('scrapResume')}
              >
                <RiBookmarkLine className={styles.itemIcon} />
                스크랩 자소서
              </button>
            </div>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>
              <RiUserLine className={styles.menuIcon} />
              계정
            </h3>
            <div className={styles.menuItems}>
              <button
                className={`${styles.menuItem} ${selectedComponent === 'changePassword' ? styles.active : ''}`}
                onClick={() => setSelectedComponent('changePassword')}
              >
                <RiLockPasswordLine className={styles.itemIcon} />
                비밀번호 변경
              </button>
              <button
                className={`${styles.menuItem} ${selectedComponent === 'deleteAccount' ? styles.active : ''}`}
                onClick={() => setSelectedComponent('deleteAccount')}
              >
                <RiUserUnfollowLine className={styles.itemIcon} />
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MyPage; 