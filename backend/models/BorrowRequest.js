import mongoose from 'mongoose';

const borrowRequestSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true, default: 1 },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  purpose: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('BorrowRequest', borrowRequestSchema);
