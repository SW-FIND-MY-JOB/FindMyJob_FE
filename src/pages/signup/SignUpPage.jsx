import styles from './SignUpPage.module.css'
import SignUpForm from '../../components/signup/SignUpForm';

export default function SignUpPage(){
    return(
        <div className={styles.signUpContainer}>
            <SignUpForm/>
        </div>
    );
}