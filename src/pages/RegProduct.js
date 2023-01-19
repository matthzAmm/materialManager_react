import Button from '../elements/Button'
import styles from './Register.module.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';


function RegProduct(){

    let currentDate = new Date().toLocaleString();
    let currentUser = "default";
    let selected = document.getElementById("selectProviders")


    const[values, setValues] = useState({
        idsupplier: "",
        name: "",
        code: "",
        fiscode: "",
        desc: "",
        specie: "",

    });


    const[displayFail, setDisplayFail] = useState(false)
    const[displaySucess, setDisplaySucess] = useState(false)
    const[qrValue, setQrValue] = useState(0);


    const [listProviders, setListProviders] = useState();
    useEffect(() => {
        Axios.get("http://localhost:3001/getProviders").then((response) =>{
            setListProviders(response.data)
        });
    }, []);


    const handleChangeValues = (value) =>{
        setValues((prevValue) =>({
            ...prevValue,
            [value.target.name]: value.target.value,

        }));

    };


    const handleClickSelect = (value) =>{

        for(let i = 0; i < listProviders.length; i++){
            // eslint-disable-next-line
            if(listProviders[i].idprovider == selected.value){
                if(listProviders[i].dateRegist === null){
                    setQrValue(`${listProviders[i].cnpj}-${listProviders[i].cep}`)
                    setValues((prevValue) => ({
                        ...prevValue,
                        qrcode: `${listProviders[i].cnpj}-${listProviders[i].cep}`,
                        idsupplier: listProviders[i].idprovider
    
                    }))

                }else{
                    setQrValue(`${listProviders[i].cnpj}-${listProviders[i].cep}/CAD.${listProviders[i].dateRegist}`)
                    setValues((prevValue) => ({
                        ...prevValue,
                        qrcode: `${listProviders[i].cnpj}-${listProviders[i].cep}/CAD.${listProviders[i].dateRegist}`,
                        idsupplier: listProviders[i].idprovider
    
                    }))
                }

            }
        }

    }


    const handleOnClick = () =>{

        if(values.name === ""){
            setDisplayFail({
                state: true,
                failInput: "Nome"
            })
            setTimeout(() =>{ setDisplayFail(false)}, "3000")
    
        }else if(values.idsupplier === ""){
            setDisplayFail({
                state: true,
                failInput: "Fornecedor"
            })
            setTimeout(() =>{ setDisplayFail(false)}, "3000")
                   
        }else if(values.fiscode === ""){

            setDisplayFail({
                state: true,
                failInput: "Codigo Fiscal"
            })
            setTimeout(() =>{ setDisplayFail(false)}, "3000")
               
        }else{
            setDisplaySucess(true)
            setTimeout(() =>{ setDisplaySucess(false)
            window.location.reload()}, "3000")
            
            
            Axios.post("http://localhost:3001/regisProduct", {
                idsupplier: values.idsupplier,
                name: values.name,
                code: values.qrcode,
                fiscode: values.fiscode,
                desc: values.desc,
                specie: values.specie,
                createdAt: currentDate,
                updatedAt: currentDate,
                createdBy: currentUser,
                updatedBy: currentUser,
            })
            
        }
    }


    return(
        <div className={styles.regProduct_container}>
            <h2>Registro de produto</h2>           
            <input name="name" type="text" placeholder="Nome*:" onChange={handleChangeValues}></input>
            <select id="selectProviders" onChange={handleClickSelect}>
                <option value="">Selecione um fornecedor*:</option>
                {typeof listProviders !== "undefined" && listProviders.map((value) =>{
                return(    
                    <option key={value.idprovider} value={value.idprovider}>{value.idprovider}- {value.name}</option>
                );
            })}
            </select>
            {qrValue !== 0  &&
                <label>QRCODE: {qrValue}</label>
            }       
            <input name="desc" type="text" placeholder="Descrição:" onChange={handleChangeValues}></input>
            <input name="fiscode" type="text" placeholder="Codigo Fiscal*:" onChange={handleChangeValues}></input>
            <input name="specie" type="text" placeholder="Specie:" onChange={handleChangeValues}></input>
            <Button text="Cadastrar" onClick={handleOnClick}/>
            {displaySucess === true &&
                <div className={styles.regSucess}>
                    <Link className={styles.regLink} to='/listproduct'>
                        <h3>Produto registrado com sucesso!</h3>
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

export default RegProduct