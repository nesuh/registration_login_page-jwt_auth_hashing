const express = require("express")
const mysql=require("mysql2")
const dotenv =require('dotenv');
const path=require('path')

dotenv.config({path: './.env'});



const app=express()

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})
// we use dot slashe
const publicDirectory = path.join(__dirname,'./public')
// used to grab any static file like CSS,js 
app.use(express.static(publicDirectory))

// parse URL -encoded bodies (as sent by html form )
app.use(express.urlencoded({extended: false }))
// parse json data (as ent by api) 
app.use(express.json());



app.set("view engine",'hbs');






db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
})



// app.get("/",(req,res)=>{
//     // res.send("<h1>home page</h1>") 
//     res.render("index")
// })
// app.get("/register",(req,res)=>{
//     // res.send("<h1>home page</h1>") 
//     res.render("register")
// })

// or 
// define Routes 
app.use('/',require('./routes/pages.js'))

app.use('/auth',require('./routes/auth'))

app.listen(3000,()=>{
    console.log("server is run!!!")
})