import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar(){

    return(
        <div className={styles.navbar_container}>
                <Link className={styles.navbar_link} to='/'><h2>Home</h2></Link>
            <div>
                <Link className={styles.navbar_link} to='/listproduct'><h2>Produtos</h2></Link>
                <Link className={styles.navbar_link} to='/listprovid'><h2>Fornecedores</h2></Link>
            </div>

        </div>
    )
}

export default NavBar