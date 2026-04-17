import express from 'express';
import Inventory from '../models/Inventory.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get inventory items (Admin gets all, Resident gets their own)
router.get('/', verifyToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'resident') {
      query = { requestedBy: req.user._id };
    }
    const items = await Inventory.find(query).sort({ createdAt: -1 }).populate('requestedBy', 'username');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an inventory item (Request by Resident, or Direct add by Admin)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newItemData = {
      ...req.body,
      requestedBy: req.user._id,
      status: req.user.role === 'admin' ? 'Approved' : 'Pending', // Admins auto-approve
    };
    const newItem = new Inventory(newItemData);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin ONLY: Update an inventory item status
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// General update (Admin only for now to prevent editing after approval, or Resident can edit if pending)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (req.user.role === 'resident' && item.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an inventory item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (req.user.role === 'resident' && item.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
