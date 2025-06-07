import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [point, setPoint] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    console.log(`로그인 유무: ${isLogin}`);

    const login = (name, point) => {
        //이름이나 point가 null이면
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
    }

    const logout = () => {
        setIsLogin(false);
        setName(null);
        setPoint(null);
        sessionStorage.removeItem('accessToken');
    }

    return(
        <AuthContext.Provider value={{name, point, isLogin, setPoint, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)