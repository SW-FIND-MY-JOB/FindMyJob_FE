import axiosInstance from "../nonAuth/axiosInstance";

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