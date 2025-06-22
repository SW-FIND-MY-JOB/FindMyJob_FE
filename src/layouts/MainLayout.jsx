import { Outlet } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import styles from './MainLayout.module.css';
import Header from '../components/commons/header/Header';
import Footer from '../components/commons/footer/Footer';

export default function MainLayout(){
    // 현재 url경로
    const location = useLocation();
    // const isMainPage = location.pathname === "/";
    const isUseFooter = location.pathname === "/cafe" || 
                        location.pathname === "/signup" || 
                        location.pathname === "/correction";
    
    const isRankingPage = location.pathname === "/ranking";

    return(
        <div className={isRankingPage ? styles.rankingLayout : styles.layout}>
            <Header/>
            <Outlet/>
            {!isUseFooter && <Footer/>}
        </div>
    );
}