import styles from './LoginModal.module.css';
import Input from '../commons/input/Input';
import { useState } from 'react';
import { loginRequest } from '../../api/authService/authAPI';
import { isMinMaxLength, isEmail } from '../../utils/validation';



export default function LoginModal({onClose}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailHasError, setEmailHasError] = useState(false);
    const [passwordHasError, setPasswordHasError] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const emailInputHandler = (e) => {
        //input에 입력하면 에러 풀리게
        setLoginError(false);
        setEmailHasError(false);

        setEmail(e.target.value);
    }

    const passwordInputHandler = (e) => {
        //input에 입력하면 에러 풀리게
        setLoginError(false);
        setPasswordHasError(false);

        setPassword(e.target.value);
    }

    //엔터키 누르는 이벤트
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitLogin(); // 로그인 함수 실행
        }
    }

    //로그인 
    const submitLogin = () => {
        //형식 검증
        if (!isEmail(email) || !isMinMaxLength(password, 8, 15)){
            //email 검증
            if (!isEmail(email)){
                setEmailHasError(true);
            }
            //pw 검증
            if (!isMinMaxLength(password, 8, 15)){
                setPasswordHasError(true);
            }
            return;
        }

        //검증 성공시 api 호출
        loginRequest(email, password, setLoginError);
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.loginContainer}>
                {/* 윗부분 */}
                <div className={styles.topContainer}>
                    <p>로그인</p>
                    <p onClick={() => onClose()}
                       style={{cursor: 'pointer'}}
                    >
                        x
                    </p>
                </div>

                {/* 로그인 부분 */}
                <div className={styles.mainContainer}>
                    <Input
                        placeholder='이메일 주소'
                        value={email}
                        onChange={(e) => {
                            emailInputHandler(e);
                        }}
                        onKeyDown={handleKeyDown}
                        error={emailHasError ? '※정확한 이메일 아이디를 입력하세요.' : 
                            loginError ? '※이메일을 다시 확인해주세요.':
                            null}
                    />
                    <Input
                        type="password"
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => {
                            passwordInputHandler(e);
                        }}
                        onKeyDown={handleKeyDown}
                        error={passwordHasError ? '※비밀번호는 8~15자리여야 합니다.' : 
                            loginError ? '※비밀번호를 다시 확인해주세요.':
                            null}
                    />

                    {/* 로그인 버튼 */}
                    <div className={styles.buttonBox}
                         onClick={() => submitLogin()}
                    >
                        로그인
                    </div>
                </div>

                {/* 아랫부분 */}
                <div className={styles.bottomContainer}>
                    <p>아직 회원이 아니세요?</p>
                    <a href='/signup' style={{fontWeight:'700', color:'#2A6AFF'}}>회원 가입</a>
                </div>
            </div>
        </div>
    )
}