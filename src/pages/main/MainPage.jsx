import styles from "./MainPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainTopArea from "../../components/landing/MainTopArea";
import Calendar from "../../components/landing/Calendar";
import banner from "/images/ranking_banner.png";

export default function MainPage(){
    const navigate = useNavigate();
    const [isUpdateScrap, setIsUpdateScrap] = useState(false);

    return(
        <div className={styles.mainPageLayout}>
            <div className={styles.mainPageContainer}>
                <MainTopArea isUpdateScrap={isUpdateScrap} setIsUpdateScrap={setIsUpdateScrap}/>
                
                {/* 배너 광고 */}
                <div className={styles.bannerContainer} onClick={() => navigate("/ranking")}>
                    <img src={banner} alt="banner" />
                </div>

                <Calendar isUpdateScrap={isUpdateScrap}/>
            </div>
        </div>
    );
}