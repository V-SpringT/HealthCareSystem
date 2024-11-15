import mongoose from 'mongoose';
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.mongoURL);
        console.log("Connect success")
    }
    catch(error){
        console.log("Connect Error")
    }
}

export default connect