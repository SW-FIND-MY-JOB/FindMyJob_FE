import styles from './LoginModal.module.css';
import LoginInput from '../commons/input/LoginInput';


export default function LoginModal(){
    return(
        <div className={styles.overlay}>
            <div className={styles.loginContainer}>
                {/* 윗부분 */}
                <div className={styles.topContainer}>
                    <p>로그인</p>
                    <p>x</p>
                </div>

                {/* 로그인 부분 */}
                <div className={styles.mainContainer}>
                    <LoginInput/>
                </div>

                {/* 아랫부분 */}
                <div className={styles.bottomContainer}>
                    <p>아직 회원이 아니세요?</p>
                    <a href='/signup'>회원 가입</a>
                </div>
            </div>
        </div>
    )
}