import { createContext, useContext, useState, useEffect } from 'react'
import { getToken } from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [point, setPoint] = useState(null);
    const [isLogin, setIsLogin] = useState(!!getToken());
    const [isAuthChecked, setIsAuthChecked] = useState(false); // 인증 확인 완료 여부

    const login = (name, point) => {
        if ( name == null || point == null ){
            setIsLogin(false);
            setName(null);
            setPoint(null);
        }
        else {
            setIsLogin(true);
            setName(name);
            setPoint(point);
        }
        setIsAuthChecked(true); // 인증 확인 완료
    }

    const logout = () => {
        setIsLogin(false);
        setName(null);
        setPoint(null);
        setIsAuthChecked(true); // 로그아웃도 인증 확인 완료 상태
        sessionStorage.removeItem('accessToken');
    }

    const setAuthCheckComplete = () => {
        setIsAuthChecked(true);
    }

    return(
        <AuthContext.Provider value={{
            name, 
            point, 
            isLogin, 
            isAuthChecked, 
            setPoint, 
            login, 
            logout, 
            setAuthCheckComplete
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)