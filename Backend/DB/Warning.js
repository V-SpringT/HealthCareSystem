import mongoose from 'mongoose';


const warningSchema = new mongoose.Schema({
    diviceId:{
        type: String
    },
    patientId: {
        type: String
    },
    doctorId: {
        type: String      
    },  
    message : {
        type: String,
    },
    type:{
        type: String,
    }
});
  
// Tạo model từ schema
const Warning = mongoose.model('Warning', warningSchema);
module.exports = Warning;
