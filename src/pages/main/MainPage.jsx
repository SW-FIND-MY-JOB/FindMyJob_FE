import styles from "./MainPage.module.css";
import { useState } from "react";
import MainTopArea from "../../components/landing/MainTopArea";
import Calendar from "../../components/landing/Calendar";

export default function MainPage(){
    const [isUpdateScrap, setIsUpdateScrap] = useState(false);

    return(
        <div className={styles.mainPageLayout}>
            <div className={styles.mainPageContainer}>
                <MainTopArea isUpdateScrap={isUpdateScrap} setIsUpdateScrap={setIsUpdateScrap}/>
                <Calendar isUpdateScrap={isUpdateScrap}/>
            </div>
        </div>
    );
}