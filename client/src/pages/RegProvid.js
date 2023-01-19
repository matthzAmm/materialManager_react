
import Axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../elements/Button'
import styles from './Register.module.css'

function RegProvid(){

    let qrcode
    let dateFormat
    const[values, setValues] = useState({
        name: "",
        cnpj: "",
        cep: "",
        datereg: "",
        qrcode: "",

    });


    const[displaySucess, setDisplaySucess] = useState(false)
    const[displayFail, setDisplayFail] = useState(false)


    const handleChangeValues = (value) =>{
        setValues((prevValue) =>({
            ...prevValue,
            [value.target.name]: value.target.value,

        }));

    };


    const formatCodeNdate = () =>{


        if(values.datereg === ""){
            qrcode = `%${values.cnpj}%-%${values.cep}%`
            
        }else{
            qrcode = `%${values.cnpj}%-%${values.cep}%/CAD.%${values.datereg}%`
            
            dateFormat = `${values.datereg.substr(8,2)}/${values.datereg.substr(5,2)}/${values.datereg.substr(0,4)}`
     
        }
    

    }


    const handleOnClick = () =>{

        if(values.name === ""){
            setDisplayFail({
                state: true,
                failInput: "Nome"
            })
            setTimeout(() =>{ setDisplayFail(false)
        
            }, "3000")
        }else if(values.cnpj === ""){
            setDisplayFail({
                state: true,
                failInput: "CNPJ"
            })
            setTimeout(() =>{ setDisplayFail(false)
        
            }, "3000")
        }else if(values.cep === ""){
            setDisplayFail({
                state: true,
                failInput: "CEP"
            })
            setTimeout(() =>{ setDisplayFail(false)
        
            }, "3000")
        }else{

            setDisplaySucess(true)     
            formatCodeNdate()

            setTimeout(() =>{ setDisplaySucess(false)
            window.location.reload(false)
            }, "2000")
            Axios.post("http://localhost:3001/regisProvider", {
                name: values.name,
                cnpj: values.cnpj,
                cep: values.cep,
                datereg: dateFormat,
                qrcode: qrcode,
            })
        }


    }


    return(
        <div className={styles.regProduct_container}>
            <h2>Registro de fornecedor</h2>       
            <input name="name" type="text" placeholder="Nome*:" onChange={handleChangeValues}></input>    
            <input name="cnpj" type="number" placeholder="CNPJ*:" onChange={handleChangeValues}></input>
            <input name="cep" type="number" placeholder="CEP:" onChange={handleChangeValues}></input>
            <input name="datereg" type="date" data-date-format="DD/MM/YYYY" placeholder="Data de Cadastro:" onChange={handleChangeValues}></input>
            <Button text="Cadastrar" onClick={handleOnClick}/>
            {displaySucess === true &&
                <div className={styles.regSucess}>
                    <Link className={styles.regLink} to='/listproduct'>
                        <h3>Fornecedor registrado com sucesso!</h3>
                    </Link>
                </div>
            }
            {displayFail.state === true &&
                <div className={styles.regFail}>
                    <Link className={styles.regFailLink} to='/listproduct'>
                        <h3>É necessario preencher o campo {displayFail.failInput}</h3>
                    </Link>
                </div>
            }
        </div>     
    )
}

export default RegProvid