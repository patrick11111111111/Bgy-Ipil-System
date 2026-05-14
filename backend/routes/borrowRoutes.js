import express from 'express';
import BorrowRequest from '../models/BorrowRequest.js';
import Inventory from '../models/Inventory.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all borrow requests (Admin)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const requests = await BorrowRequest.find().populate('userId', 'username').populate('itemId').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's borrow requests
router.get('/my-requests', verifyToken, async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ userId: req.user.id }).populate('itemId').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new borrow request
router.post('/', verifyToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    const newRequest = new BorrowRequest({
      itemId,
      userId: req.user.id,
      status: 'Pending'
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update borrow request status (Admin)
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BorrowRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    // If approved, we might want to decrement inventory quantity, but for now just update request status
    
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
