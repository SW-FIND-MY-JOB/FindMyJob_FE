import styles from './Input.module.css';

export default function Input( { success, error, ...props } ){

    return(
        <div className={styles.inputLayout}>
            {/* 인풋 */}
            <input 
                className={styles.inputStyle}
                style={error ? {borderColor: 'red'} : null}
                {...props}
            />

            {/* 성공 메시지 */}
            {success && 
                <div className={styles.successMessageBox}>
                    {success}
                </div>
            }

            {/* 에러 메시지 */}
            {error && 
                <div className={styles.errorMessageBox}>
                    {error}
                </div>
            }
        </div>
    );
}