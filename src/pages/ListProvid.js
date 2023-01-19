import Axios from "axios";
import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import styles from './ListProvid.module.css'
import printIcon from '../icons/printer-icon.png'

function ListProvid(){

    const [listProviders, setListProviders] = useState();
    const [seachValue, setSeachValue] = useState();
    let componentPrint


    useEffect(() => {
        Axios.get("http://localhost:3001/getProviders").then((response) =>{
            setListProviders(response.data)
        });
    }, []);


    const handleOnChange = (value) => {
        setSeachValue(value.target.value)
    }


    return(
        <div className={styles.listProv_container}>
            <h2>Fornedores:</h2>
            <input type="text" placeholder='Pesquisar:' onChange={handleOnChange}></input>
            <ReactToPrint
                trigger={() =>{
                    return (
                        <button 
                            className={styles.printButton}><img src={printIcon} alt="imprimir">
                            </img><p>Imprimir</p> </button>)                 
                }}
                content={() => componentPrint}
                documentTitle="Lista de Produtos:"
                pageStyle= "print"
            />
            <div ref={el=>(componentPrint =el)}>
                {typeof listProviders !== "undefined" && listProviders.map((value) =>{
                    return(
                        <div key={value.idprovider}>
                        {(seachValue === undefined || seachValue === "") && 
                            <div key={value.idprovider} className={styles.provData_container}>
                                <div className={styles.id_container}>
                                    <p className={styles.provId}>ID: {value.idprovider}</p>
                                </div>
                                <div>
                                    <div>
                                        <p className={styles.provName}>Nome: {value.name}</p>                   
                                        <p className={styles.provCnpj}>CNPJ: {value.cnpj}</p>
                                        <p className={styles.provCep}>CEP: {value.cep}</p>
                                    </div>
                                    <div>
                                        <p className={styles.provQrcode}>QRcode: {value.qrcode}</p>
                                        <p className={styles.provDate}>Data de Registro: {value.dateRegist}</p>            
                                    </div>
                                </div>
                            </div>}
                        </div>
                    );
                })}
                {typeof listProviders !== "undefined" && listProviders.map((value) =>{
                    return(
                        <div key={value.idprovider}>
                            {(seachValue !== undefined && seachValue !== ""  
                            && seachValue.toLowerCase() === value.name.substr(0, seachValue.length).toLowerCase())&&

                            <div key={value.idprovider} className={styles.provData_container}>
                                <div className={styles.id_container}>
                                    <p className={styles.provId}>ID: {value.idprovider}</p>
                                </div>
                                <div>
                                    <div>
                                        <p className={styles.provName}>Nome: {value.name}</p>                   
                                        <p className={styles.provCnpj}>CNPJ: {value.cnpj}</p>
                                        <p className={styles.provCep}>CEP: {value.cep}</p>
                                    </div>
                                    <div>
                                        <p className={styles.provQrcode}>QRcode: {value.qrcode}</p>
                                        <p className={styles.provDate}>Data de Registro: {value.dateRegist}</p>

                                    </div>
                                </div>
                            </div>}             
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProvid