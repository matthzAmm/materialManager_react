const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")


// mysql host config

let host = "localhost"
let root = "root"
let pass = "password"


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"

});


con.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log("connected")
        con.query("CREATE DATABASE IF NOT EXISTS dbgear")
    }
})


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dbgear"
});


db.connect(() => {
    let sql = 
    "CREATE TABLE IF NOT EXISTS  products (idproduct int unsigned NOT NULL AUTO_INCREMENT, idsupplier varchar(45) NOT NULL, name varchar(45) NOT NULL, code varchar(100) DEFAULT NULL,descript varchar(200) DEFAULT NULL,fiscalCode varchar(45) NOT NULL,specie varchar(45) DEFAULT NULL,createdAt varchar(45) DEFAULT NULL,createdBy varchar(45) DEFAULT NULL,updatedAt varchar(45) DEFAULT NULL,updatedBy varchar(45) DEFAULT NULL,PRIMARY KEY (idproduct))" 
    db.query(sql, (err, result) => {
        console.log(err)
    })
    sql =
    "CREATE TABLE IF NOT EXISTS providers (idprovider int NOT NULL AUTO_INCREMENT, cnpj varchar(45) NOT NULL, cep varchar(45) NOT NULL, dateRegist varchar(45) DEFAULT NULL, qrcode varchar(120) NOT NULL, name varchar(45) NOT NULL,PRIMARY KEY (idprovider))"
    db.query(sql, (err, result) => {
        console.log(err)
    })

})


app.use(cors());
app.use(express.json());
app.post("/regisProduct", (req, res) => {
    const { name } = req.body
    const { fiscode } = req.body
    const { desc } = req.body
    const { specie } = req.body
    const { createdBy } = req.body
    const { createdAt } = req.body
    const { idsupplier} = req.body
    const { code} = req.body

    let sql =
    "INSERT INTO products ( idsupplier, name, code, descript, fiscalCode, specie, createdAt, createdBy, updatedAt, updatedBy) VALUES ( ?,?,?,?,?,?,?,?,?,? )";

    db.query(sql, [idsupplier, name, code, desc, fiscode, specie, createdAt, createdBy, createdAt, createdBy], (err, result) =>{
        console.log(err);
    })
})


app.post("/regisProvider", (req, res) => {
    const { name} = req.body
    const { cnpj } = req.body
    const { cep } = req.body
    const { datereg } = req.body
    const { qrcode } = req.body

    

    let sql =
    "INSERT INTO providers ( name, cnpj, cep, dateRegist, qrcode) VALUES ( ?,?,?,?,?)";
    db.query(sql, [name, cnpj, cep, datereg, qrcode], (err, result) =>{
        console.log(err);
    })
})


app.get("/getProducts", (req, res) =>{

    let sql = "SELECT * from products"

    db.query(sql, (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
})


app.get("/getProviders", (req, res) =>{

    let sql = "SELECT * from providers"

    db.query(sql, (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
})


app.listen(3001, ()=>{
    console.log("server on")
})
