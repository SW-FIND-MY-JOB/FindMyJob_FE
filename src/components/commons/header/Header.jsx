import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from '../../login/LoginModal';

import styles from "./Header.module.css";
import logoImg from "../../../assets/images/logoImg.png";
import searchImg from "../../../assets/images/searchImg.png";


export default function Header(){
    const navigate = useNavigate();
    const location = useLocation();

    const [showLogin, setShowLogin] = useState(false);
    const [value, setValue] = useState("");

    function handleInputChange(e){
        setValue(e.target.value);
    }

    return(
        // <div className={styles.headerBox}>
            <div className={styles.headerContainer}>
                {/* 헤더 윗부분 */}
                <div className={styles.headerTop}>
                    {/* 로고 영역 */}
                    <img src={logoImg} alt="로고" style={{cursor: 'pointer'}} onClick={()=>{navigate('/');}}/>
                    
                    {/* 검색영역 */}
                    <div className={styles.searchContainer}>
                        <input
                            className={styles.searchTextBox}
                            value={value}
                            placeholder='FIND MY JOB'
                            onChange={handleInputChange}
                        />
                        <img src={searchImg} alt="검색" style={{cursor: 'pointer'}}/>

                        {/* 구분선 */}
                        <div style={{
                            width: '2px',
                            height: '60%',
                            backgroundColor: '#ccc',
                            margin: '0 15px'
                        }} />

                        <div className={styles.rankContainer}>
                            <div className={styles.rankNum}>1</div>
                            <div className={styles.rankName}>한국전력</div>
                        </div>
                    </div>
                </div>

                {/* 헤더 아랫부분 */}
                <div className={styles.headerBottom}>
                    <div className={styles.navigationContainer}>
                        <p
                            onClick={() => navigate("/inform")}
                            className={location.pathname === "/inform" ? styles.active : ""}
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
                            onClick={() => navigate("/ai-assay")}
                            className={location.pathname === "/assay" ? styles.active : ""}
                        >
                            AI 자소서 코칭
                        </p>
                        <p
                            onClick={() => navigate("/pass-assay")}
                            className={location.pathname === "/assay" ? styles.active : ""}
                        >
                            합격 자소서
                        </p>
                    </div>

                    <div className={styles.loginContainer}>
                        <p onClick={() => setShowLogin(true)}>
                            로그인
                        </p>
                        
                        <p onClick={() => navigate("/signup")}>
                            회원가입
                        </p>
                    </div>
                </div>

                {/* 로그인 모달창 */}
                {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
            </div>
        // </div>
    );
}