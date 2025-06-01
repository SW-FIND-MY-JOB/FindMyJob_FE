import styles from './SignUpForm.module.css';
import Input from '../commons/input/Input';
import { useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEmail, isPw, isName, isEqualValue } from '../../utils/validation';
import { debounce } from 'lodash';
import { checkDuplicatedEmail, postAuthCode, checkAuthCode, signupRequest } from '../../api/authService/authAPI';

export default function SignUpForm(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [authEmail, setAuthEmail] = useState(null);
    const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    // 에러
    const [nameHasError, setNameHasError] = useState(null);
    const [emailHasError, setEmailHasError] = useState(null);
    const [codeHasError, setCodeHasError] = useState(null);
    const [passwordHasError, setPasswordHasError] = useState(null);
    const [rePasswordHasError, setRePasswordHasError] = useState(null);

    // 이름 핸들러
    const nameInputHandler = (e) => {
        setName(e.target.value);
        if(!isName(e.target.value)){
            setNameHasError(true);
        } else{
            setNameHasError(false);
        }
    }

    // 이메일 중복 검사
    const debouncedCheckEmail = useCallback(
        // 500ms 동안 입력이 없을 때 실행
        debounce(async(email) => {
            try{
                // 이메일 검증
                const response = await checkDuplicatedEmail(email);
                console.log('이메일 검증값: ' + response.result);
                setIsDuplicatedEmail(response.result);
            } catch(error){
                console.log(error);
                setIsDuplicatedEmail(false);
            }
        }, 200), 
        []
    );

    // 이메일 인증버튼
    const submitEmailCode = () => {
        //이메일 형식에 문제가 있거나 중복되거나 이미 인증했으면
        if(emailHasError || isDuplicatedEmail || isAuth){
            return;
        }
        try{
            //인증번호 발송
            postAuthCode(email);
            alert("인증번호 발송!");
            //인증번호 받은 이메일
            setAuthEmail(email);
        } catch(error){
            console.log(error);
            alert("인증번호 발송 실패");
        }
    }

    // 이메일 핸들러
    const emailInputHandler = (e) => {
        //인증이되었다면 입력 막음
        if(isAuth){
            setEmail(authEmail);
            return;
        }
        const inputValue = e.target.value;
        setEmail(inputValue);
        if(!isEmail(inputValue)){
            setEmailHasError(true);
            setIsDuplicatedEmail(true);
        } else{
            setEmailHasError(false);
            debouncedCheckEmail(inputValue);
        }
    }

    // 코드 인증 버튼
    const submitCheckAuchCode = async() => {
        //인증발송한 메일이 null이라면
        if(authEmail == null){
            setCodeHasError(true);
            return;
        }

        //이미 인증했으면
        if(isAuth){
            return;
        }

        try{
            const response = await checkAuthCode(authEmail, code);
            //인증 활성화
            setIsAuth(response.isSuccess);
            //코드 에러 처리
            setCodeHasError(!response.isSuccess);
        } catch (error) {
            //인증 비활성화
            setIsAuth(false);
            setCodeHasError(true);
        }
    }

    // 코드 핸들러
    const codeInputHandler = (e) => {
        //인증이되었다면 입력 막음
        if(isAuth){
            return;
        }
        setCode(e.target.value);
        setCodeHasError(false);
    }

    // 비번 핸들러
    const passwordInputHandler = (e) => {
        setPassword(e.target.value);
        if (!isPw(e.target.value)){
            setPasswordHasError(true);
        } else {
            setPasswordHasError(false);
        }
    }

    // 재비번 핸들러
    const rePasswordInputHandler = (e) => {
        setRePassword(e.target.value);
        if (!isEqualValue(password, e.target.value)){
            setRePasswordHasError(true);
        } else {
            setRePasswordHasError(false);
        }
    }

    // 회원가입 버튼 클릭시
    const signUpSubmit = async() => {
        // 잘못된 부분이 있는지 확인
        if(!isName(name) || !isEmail(authEmail) || !isAuth || !isPw(password) || !isEqualValue(password, rePassword)){
            if(!isName(name)){
                setNameHasError(true);
            }
            if(!isEmail(email)){
                setEmailHasError(true);
            }
            if(!isAuth){
                setCodeHasError(true);
            }
            if(!isPw(password)){
                setPasswordHasError(true);
            }
            if(!isEqualValue(password, rePassword)){
                setRePasswordHasError(true);
            }

            return;
        }

        //잘못된 부분이 없다면 api호출
        try{
            const response = await signupRequest(name, email, password);
            alert('회원가입 성공');
            navigate("/");
        } catch (error){
            alert('회원가입 실패');
        }
    }

    return(
        <div className={styles.signUpFormContainer}>
            <div className={styles.formContainer}>
                {/* 타이틀 */}
                <div className={styles.titleContainer}>
                    <h2>회원가입</h2>
                </div>

                {/* 이름 영역 */}
                <p>이름</p>
                <Input
                    id='name'
                    placeholder='이름'
                    value={name}
                    onChange={(e) => {
                        nameInputHandler(e);
                    }}
                    error={nameHasError ? '※이름은 1~10자로 입력해주세요.' : null}
                />

                {/* 메일 영역 */}
                <p>이메일</p>
                <div className={styles.emailContainer}>
                    <Input
                        id='email'
                        placeholder='example@test.com'
                        value={email}
                        onChange={(e) => {
                            emailInputHandler(e);
                        }}
                        success={!isDuplicatedEmail ? '※사용할 수 있는 이메일입니다.' : null }
                        error={isEmpty(email) ? null : 
                            emailHasError ? '※정확한 이메일 아이디를 입력하세요.' : 
                            isDuplicatedEmail ? '※이미 존재하는 이메일 아이디입니다.' : null }
                    />
                    <div className={styles.emailButton}
                        onClick={(e) => {
                            submitEmailCode(e);
                        }}
                    >
                        인증하기
                    </div>
                </div>

                <div className={styles.emailContainer}>
                    <Input
                        id='code'
                        placeholder='인증번호'
                        value={code}
                        onChange={(e) => {
                            codeInputHandler(e);
                        }}
                        success={isAuth ? '※인증되었습니다.' : null}
                        error={codeHasError ? '※인증번호를 확인해주세요' : null}

                    />
                    <div className={styles.emailButton}
                        onClick={(e) => {
                            submitCheckAuchCode(e);
                        }}
                    >
                        확인
                    </div>
                </div>

                {/* 비밀번호 영역 */}
                <p>비밀번호</p>
                <Input
                    id='password'
                    type='password'
                    placeholder='비밀번호'
                    value={password}
                    onChange={(e) => {
                        passwordInputHandler(e);
                    }}
                    error={passwordHasError ? '※비밀번호는 특수문자를 포함한 8~15자리여야 합니다.' : null}
                />
                <Input
                    id='rePassword'
                    type='password'
                    placeholder='비밀번호 확인'
                    value={rePassword}
                    onChange={(e) => {
                        rePasswordInputHandler(e);
                    }}
                    error={rePasswordHasError ? '※비밀번호가 일치하지 않습니다.' : null}
                />

                {/* 버튼 영역 */}
                <div className={styles.signUpButtonContainer}
                    onClick={(e) => {
                        signUpSubmit(e);
                    }}
                >
                    회원가입
                </div>
            </div>

        </div>
    )
}