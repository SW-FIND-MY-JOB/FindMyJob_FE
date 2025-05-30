import axiosInstance from "../nonAuth/axiosInstance";
import axiosInstanceForAuth from "../auth/axiosInstanceForAuth";

//로그인
export const loginRequest = async (email, password, setLoginError) => {
    try{
        const response = await axiosInstance.post('/auth-service/api/users/login', 
            {
                email,
                password
            }
        );
        const accessToken = response.headers['authorization'];
        sessionStorage.setItem('accessToken', `${accessToken}`);
        console.log(response);
        window.location.reload();
    } catch (error) {
        setLoginError(true);
        console.log(`로그인에러: ${error}`);
        alert("로그인 실패");
    }
}

//로그아웃
export const logoutRequest = async() =>{
    try{
         await axiosInstanceForAuth.post('/auth-service/api/users/logout');
         alert('로그아웃 성공');
    } catch (error){
        alert('로그아웃 실패');
    }
}

//사용자 정보 가져오기
export const getUserInfo = async () => {
    try{
        const response = await axiosInstanceForAuth.get('/auth-service/api/users/inform');
        
        console.log(response);
        return response.data.result;
    } catch (error) {
        console.log(`로그인실패: ${error}`);
    }
}

//이메일 중복 확인
export const checkDuplicatedEmail = async (email) => {
    try{
        const response = await axiosInstance.get(`/auth-service/api/users/mail?mail=${email}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`이메일 체크 실패: ${error}`);
    }
}

//인증번호 발송
export const postAuthCode = async (email) => {
    try{
        const response = await axiosInstance.post(`/auth-service/api/mail/auth-code`,
            {
                "email": email
            }
    );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`이메일 체크 실패: ${error}`);
    }
}

//인증번호 검사
export const checkAuthCode = async (email, code) => {
    try{
        console.log(`email: ${email}, code: ${code}`);
        const response = await axiosInstance.post(`/auth-service/api/mail/verify-code`,
            {
                "email": email,
                "code": code
            }
    );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`코드 체크 실패: ${error}`);
    }
}

//회원가입
export const signupRequest = async (name, email, password) => {
    try{
        const response = await axiosInstance.post(`/auth-service/api/users/join`,
            {
                "name": name,
                "email": email,
                "password": password
            }
    );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(`회원가입 실패: ${error}`);
    }
}