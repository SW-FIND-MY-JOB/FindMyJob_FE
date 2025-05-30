import styles from './NotFoundPage.module.css';
import notFoundImg from '../../assets/images/notFoundImg.png';

export default function NotFoundPage(){
    return(
        <div className={styles.notFoundContainer}>
            <img src={notFoundImg} alt='404 Not Found' style={{width: '30%', objectFit: 'cover'}}/>
        </div>
    );
}