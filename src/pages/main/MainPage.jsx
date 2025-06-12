import styles from "./MainPage.module.css";

import MainTopArea from "../../components/landing/MainTopArea";
import Calendar from "../../components/landing/Calendar";

export default function MainPage(){
    return(
        <div className={styles.mainPageLayout}>
            <div className={styles.mainPageContainer}>
                <MainTopArea/>
                <Calendar/>
            </div>
        </div>
    );
}