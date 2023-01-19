
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

function Button({to, text, onClick}){

    return(
        <div className={styles.btn_container} onClick={onClick}> 
            <Link className={styles.btn} to={to}>
                {text}
            </Link>
        </div>
    )
}

export default Button