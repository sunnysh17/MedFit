const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//defining schema
const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    age: {
        type:Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }

});

patientSchema.pre("save",async function(next){

    if(this.isModified("password"))
    {
        console.log(`the current password is: ${this.password}`);
        this.password = await bcrypt.hash(this.password,10); //convert password to hash.
        console.log(`the hashed password is: ${this.password}`);
        this.confirmpassword = undefined; //confirm password will not be stored.
    }
    
    next();
});


//creating collections
const PatientRegister = new mongoose.model("Patientregister",patientSchema);
module.exports = PatientRegister;