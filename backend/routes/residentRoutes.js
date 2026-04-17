import express from 'express';
import Resident from '../models/Resident.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all residents (Admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const residents = await Resident.find().sort({ createdAt: -1 });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single resident by ID (Admin or the specific resident)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'resident' && req.user.residentId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to view this profile' });
    }
    const resident = await Resident.findById(req.params.id);
    res.json(resident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a resident (Public/Admin, used during registration/signup)
router.post('/', async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    const savedResident = await newResident.save();
    res.status(201).json(savedResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a resident (Admin or the specific resident)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'resident' && req.user.residentId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }
    const updatedResident = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resident (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resident deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
