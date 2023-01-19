import Axios from 'axios'
import { useEffect, useState} from 'react'
import styles from './ListProduct.module.css'
import ReactToPrint from "react-to-print"
import printIcon from '../icons/printer-icon.png'

function ListProduct(){

    const [listProducts, setListProducts] = useState();
    const [seachValue, setSeachValue] = useState();
    let componentPrint

    useEffect(() => {
        Axios.get("http://localhost:3001/getProducts").then((response) =>{
            setListProducts(response.data)
        });
    }, []);

    const handleOnChange = (value) => {
        setSeachValue(value.target.value)
    }


    return(
        <div className={styles.listProd_container}>

            <h2>Produtos:</h2>
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
                {typeof listProducts !== "undefined" && listProducts.map((value) =>{
                    return(
                        <div key={value.idproduct}>
                        
                        {(seachValue === undefined || seachValue === "") && 
                        <div className={styles.productData_container} > 
    
                                <div className={styles.id_container}>
                                    <p className={styles.listProd_id}>ID: {value.idproduct}</p>     
                                </div>
                                <div>
                                    <div>                                          
                                        <p className={styles.listProd_name}>Nome: {value.name}</p>
                                        <p className={styles.listProd_fiscode}>Codigo Fiscal: {value.fiscalCode}</p>
                                        <p className={styles.listProd_specie}>Especie: {value.specie}</p>                                              
                                    </div>
                                    <div>                                         
                                        <p className={styles.listProd_descript}>Descrição: {value.descript}</p>
                                        <p className={styles.listProd_code}>QRcode: {value.code}</p>
                                                         
                                    </div>
                                    <div>                                         
                                        <p className={styles.listProd_createdAt}>CreatedAt: {value.createdAt}</p>
                                        <p className={styles.listProd_createdAt}>UpdatedAt: {value.updatedAt}</p>
                                        <p className={styles.listProd_createdBy}>CreatedBy: {value.createdBy}</p>
                                        <p className={styles.listProd_createdBy}>UpdatedBy: {value.updatedBy}</p>   
                                                         
                                    </div>
                                </div>
                                                    
                        </div>}
                        
                        
                        </div>
                        );
                })}
                {typeof listProducts !== "undefined" && listProducts.map((value) =>{
                    return(
                        <div key={value.idproduct}>
                        {((seachValue !== undefined && seachValue !== "" && seachValue.toLowerCase() === value.name.substr(0, seachValue.length).toLowerCase())
                        || (seachValue !== undefined && seachValue !== ""  && seachValue === value.createdAt.substr(0, seachValue.length)))&&
                        <div className={styles.productData_container}>
                             
                            <div className={styles.id_container}>
                                <p className={styles.listProd_id}>ID: {value.idproduct}</p>     
                            </div>
                            <div>
                                <div>                                          
                                    <p className={styles.listProd_name}>Nome: {value.name}</p>
                                    <p className={styles.listProd_fiscode}>Codigo Fiscal: {value.fiscalCode}</p>
                                    <p className={styles.listProd_specie}>Especie: {value.specie}</p>                                              
                                </div>
                                <div>                                         
                                    <p className={styles.listProd_descript}>Descrição: {value.descript}</p>
                                    <p className={styles.listProd_code}>QRcode: {value.code}</p>                                          
                                </div>
                                <div>                                         
                                    <p className={styles.listProd_createdAt}>CreatedAt: {value.createdAt}</p>
                                    <p className={styles.listProd_createdAt}>UpdatedAt: {value.updatedAt}</p>
                                    <p className={styles.listProd_createdBy}>CreatedBy: {value.createdBy}</p>
                                    <p className={styles.listProd_createdBy}>UpdatedBy: {value.updatedBy}</p>   
                                </div>
                            </div>
                        </div>}
                    
                        </div>
                    )})}
            </div>
                    
            
        </div>
    )
}

export default ListProduct