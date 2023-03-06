const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1/medfit",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then((con)=>{
    console.log(`Connection successful!`);
}).catch((e)=> {
    console.log(`connection failed! ${e}`);
})