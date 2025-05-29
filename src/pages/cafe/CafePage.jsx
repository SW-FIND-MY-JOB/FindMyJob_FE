import KakaoMap from "../../components/kakaoMap/KakaoMap"
import styles from './CafePage.module.css'

export default function CafePage(){
    return(
        <div className={styles.cafePageLayout}>
            <KakaoMap/>
        </div>
    )
}