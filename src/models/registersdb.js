const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    },
    // tokens:[{
    //     token:{
    //         type: String,
    //         required: true
    //     }
    // }]
});

//generating tokens
// patientSchema.methods.generateAuthToken = async function(){
//     try{
//         const token = jwt.sign({_id:this._id.toString()},"mynameissunnysatishhalkattiyoutub");
//         this.tokens = this.tokens.concat({token:token});
//         //console.log(token);
//         await this.save();
//         return token;
//     }catch(error){
//         res.send("the error part" + error);
//         console.log("the error part" + error);
//     }
// }

//converting passwd to hash
patientSchema.pre("save",async function(next){

    if(this.isModified("password"))
    {
        //console.log(`the current password is: ${this.password}`);
        this.password = await bcrypt.hash(this.password,10); //convert password to hash.
        //console.log(`the hashed password is: ${this.password}`);
        this.confirmpassword = await bcrypt.hash(this.password,10);; //confirm password will not be stored.
    }
    
    next();
});


//creating collections
const PatientRegister = new mongoose.model("Patientregister",patientSchema);
module.exports = PatientRegister;