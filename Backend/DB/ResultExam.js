import mongoose from 'mongoose';


const resultExamSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        require: true
    },
    patientId: {
        type: String,
        require: true
    },
    heartRate:{
        type: Number,
    },
    temperature:{
        type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});
  
// Tạo model từ schema
const ResultExam = mongoose.model('ResultExam', resultExamSchema);
module.exports = ResultExam;
