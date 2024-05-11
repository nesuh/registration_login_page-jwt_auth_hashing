
const mysql=require("mysql2");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})






exports.register = (req,res)=>{
console.log(req.body);
// const name=req.body.name;
// const email=req.body.email;
// const password=req.body.password;
// const passwordConfirm = req.body.passwordConfirm;

// or use like these  when variable and name is the same 
const {name,email,password,passwordConfirm}=req.body;
db.query('select email from users where email=?',[email],async(error,resultes)=>{
    if(error){
        console.log(error)
    }
        if(resultes.lenght>0){
return res.render('register',{
    message:"that email is already in use"
})
        }else if(password!==passwordConfirm){
          return  res.render('register',{
            message:"passoword do not mathch"
           }) 
        }

let hashedPassword = await bcrypt.hash(password,8);
console.log(hashedPassword);
// res.send("sending")
// after all seteps we insert data on mysql db table 
db.query("insert into users set ?",{name,email,password:hashedPassword},(error,resultes)=>{
    if(error){
        console.log(error)
    }else{
        console.log(resultes)
return res.render('register', {
    message:"user is registerd!"
})



    }
});




    
})








//   res.send("Form submited!");

}