import styles from "./Footer.module.css";

export default function Footer() {
    return(
        <div className={styles.footerContainer}>
            <div className={styles.footerContents}>
                <p className={styles.content1}>취업으로의 한 발짝!</p>
                <p className={styles.content2}>내일찾기</p>
                <p className={styles.content3}>서경대 SW 인재양성 _ 김주영, 이태호</p>
            </div>
        </div>
    ); 
}