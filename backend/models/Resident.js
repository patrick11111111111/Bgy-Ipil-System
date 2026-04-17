import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Resident', residentSchema);
