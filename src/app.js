const express = require("express");
const app = express();
const path = require("path");
const hbs =  require("hbs");
const port = process.env.PORT || 3000;
require("./db/connection");
const Register = require("./models/register");
const async = require("hbs/lib/async");


const static_path = path.join(__dirname,"../public");
// const views_path = path.join(__dirname,"../templates/views");
// const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
// app.set("view engine","hbs");
// app.set("views",views_path);
// hbs.registerPartials(partial_path);

app.get("/",(req,res) =>{
    res.render("index");
});
app.get("/register",(req,res) => {
    res.render("register");
})

app.get("/login",(req,res)=> {
    res.render("login.html");
})


app.post("/register",async(req,res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if(password === confirmPassword){
            const user = new Register({
                username : req.body.username,
                email : req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })

            const result = await user.save();
            res.redirect("./login.html");
        }else{
            res.send("passwords are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login",async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} and ${password}`);
        const userEmail = await Register.findOne({email :email});
        console.log(userEmail.password);
        console.log(password);
        if(userEmail.password === password){
            res.redirect("./index.html");
        }else{
            res.send("INVALID PASSWORD");
        }

    } catch (error) {
        res.status(400).send("INVALID")
    }
})

app.listen(port,(req,res) =>{
    console.log(`Listening to port ${port}`);
});