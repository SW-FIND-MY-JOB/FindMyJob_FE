import styles from './LoginModal.module.css';
import Input from '../commons/input/Input';
import { useState } from 'react';


export default function LoginModal({onClose}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailInputHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordInputHandler = (e) => {
        setPassword(e.target.value);
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
                    />
                    <Input
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => {
                            passwordInputHandler(e);
                        }}
                    />

                    {/* 로그인 버튼 */}
                    <div className={styles.buttonBox}
                         onClick={() => console.log('로그인 버튼 클릭!')}
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