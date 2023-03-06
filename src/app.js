const express = require('express');
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require('./db/conn');
const Patientregister = require("./models/registersdb");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000; //assign port number or default 3000

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //get the data from form

app.use(express.static(static_path)); //serving static files

app.set("view engine", "hbs"); //setting up view engine.

app.set("views", template_path);

hbs.registerPartials(partials_path); //registering partials

app.get('/', (req, res) => {
    // res.send("Hello from sunny");
    res.render("index"); //when localhost:3000 load this page as first page
});

app.get('/register', (req, res) => {
    res.render("register");
});

//create a new user in database
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const c_password = req.body.confirmpassword;
        if (password === c_password) {
            const registerPatient = new Patientregister({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            //Password Hashing (bcrypt)

            const registerp = await registerPatient.save();
            res.status(201).render("login");
        }
        else {
            res.send("Passwords do not match")
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});

app.get('/login', async (req, res) => {
    res.render("login");
});

//login check
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        //console.log(`${email} and password is ${password}`);

        const patient_email = await Patientregister.findOne({ email: email }); //returns promise
        // res.send(patient_email);
        // console.log(patient_email);

        const isMatch = await bcrypt.compare(password, patient_email.password);
       
            if (isMatch) {
                res.status(201).render("index");
            }
            else {
                res.send("Invalid Login details");
            }


    }
    catch (error) {
        res.status(400).send("Invalid Login details");
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no.: ${port}`);
});