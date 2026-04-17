import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'resident'], default: 'resident' },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' }, // Link to resident profile
}, { timestamps: true });

export default mongoose.model('User', userSchema);
