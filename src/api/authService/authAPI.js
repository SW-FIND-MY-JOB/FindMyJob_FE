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
        alert("로그인 성공");
        console.log(response);
        window.location.reload();
    } catch (error) {
        setLoginError(true);
        console.log(`로그인에러: ${error}`);
        alert("로그인 실패");
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