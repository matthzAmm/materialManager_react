import React from 'react';
import styles from './Home.module.css'
import mainIcon from '../icons/list-icon.png'
import Button from '../elements/Button';



function Home(){
    return(
        <div className={styles.home_container}>
            <h2>Bem vindo ao Gear!</h2>
            <h3>Para cadastrar ou consultar os seus dados selecione a opção abaixo:</h3>
            <img src={mainIcon} alt='lista'/>
            <div>
                <h4>Cadastro:</h4>
                <div>
                    <Button to='/regproduct' text='Produtos'/>
                    <Button to='/regprovid' text='Fornecedor'/>
                </div>

                <h4>Consulta:</h4>
                <div>
                    <Button to='/listproduct' text='Produtos'/>
                    <Button to='/listprovid' text='Fornecedor'/>
                </div>
            </div>

        </div>
    )
}

export default Home