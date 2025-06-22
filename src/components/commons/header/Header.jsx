import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import LoginModal from '../../login/LoginModal';
import { useAuth } from '../../../utils/AuthContext';
import { getUserInfo, logoutRequest } from '../../../api/authService/authAPI';

import styles from "./Header.module.css";
import logoImg from "../../../assets/images/logoImg.png";
import { RiUserLine, RiCoinsLine  } from 'react-icons/ri';

export default function Header(){
    const { name, point, isLogin, login, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogin, setShowLogin] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null);
    const isRankingPage = location.pathname === "/ranking";

    //사용자 로그인 유무 확인
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("사용자 로그인 유무 확인");
                const user = await getUserInfo();
                login(user.name, user.point);
            } catch (error) {
                console.log("사용자 로그인 유무 확인 실패");
                console.log(error.response);
                // 토큰이 유효하지 않으면 로그아웃 처리
                logout();
            }
        }
        fetchUser();
    }, [point]);

    //메뉴 바깥 영역 클릭시 함수
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const submitLogout = async() => {
        try{
            await logoutRequest();
            logout();
            navigate("/");
        } catch (error) {
            console.log(`로그아웃 실패: ${error}`);
        }
    }

    return(
        <div className={styles.headerContainer} style={{margin: isRankingPage ? '0' : '0 0 1% 0'}}>
            {/* 헤더 윗부분 */}
            <div className={styles.headerTop}>
                {/* 로고 영역 */}
                <div className={styles.logoContainer}>
                    <img src={logoImg} alt="로고" style={{width:'160px', cursor: 'pointer'}} onClick={()=>{navigate('/');}}/>
                </div>
                {/* 네비게이션션 영역 */}
                <div className={styles.navigationContainer}>
                    <p
                        onClick={() => navigate("/recruitment-notice")}
                        className={location.pathname === "/recruitment-notice" ? styles.active : ""}
                    >
                        채용정보
                    </p>
                    <p
                        onClick={() => navigate("/cafe")}
                        className={location.pathname === "/cafe" ? styles.active : ""}
                    >
                        일자리카페
                    </p>
                    <p
                        onClick={() => navigate("/correction")}
                        className={location.pathname === "/correction" ? styles.active : ""}
                    >
                        AI 자소서 코칭
                    </p>
                    <p
                        onClick={() => navigate("/cover-letter-search")}
                        className={location.pathname === "/cover-letter-search" || location.pathname === "/assay" ? styles.active : ""}
                    >
                        자소서 둘러보기
                    </p>
                    <p
                        onClick={() => navigate("/ranking")}
                        className={location.pathname === "/ranking" ? styles.active : ""}
                    >
                        랭킹
                    </p>
                </div>
                {/* 로그인 영역 */}
                {!isLogin && 
                    <div className={styles.loginContainer}>
                        <p onClick={() => setShowLogin(true)}>
                           로그인
                        </p>
                        
                        {/* 구분선 */}
                        <div style={{
                            width: '2px',
                            height: '20px',
                            borderRadius: '20px',
                            backgroundColor: '#9b9b9b',
                            margin: '0 10px'
                        }} />
                        
                        <p onClick={() => navigate("/signup")}>
                            회원가입
                        </p>
                    </div>
                }
                {/* 사용자 정보 영역 */}
                {isLogin &&
                    <div className={styles.userWrapper} ref={menuRef}>
                        <div className={styles.userContainer}>
                            {/* 클릭시 메뉴 함수 실행 */}
                            <p>
                                {/* 유저 아이콘 */}
                                <div className={styles.userInfo}  onClick={() => setShowMenu((prev) => !prev)}>
                                    <div className={styles.userIcon}>
                                        <RiUserLine size={20} />
                                    </div>
                                    &nbsp;{name}님
                                </div>
                            </p>

                            <p>
                                {/* 포인트트 아이콘 */}
                                <div className={styles.pointInfo}>
                                    <div className={styles.pointIcon}>
                                        <RiCoinsLine size={20} />
                                    </div>
                                    &nbsp;{point}P
                                </div>
                            </p>
                        </div>

                        {showMenu && (
                            <div className={styles.dropdownMenu}>
                                <p onClick={() => {
                                    navigate("/mypage");
                                    setShowMenu(false);
                                }}>마이페이지</p>
                                <p onClick={
                                    ()=>submitLogout()
                                }>로그아웃</p>
                            </div>
                        )}
                    </div>
                }
            </div>

            {/* 로그인 모달창 */}
            {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
        </div>
    );
}