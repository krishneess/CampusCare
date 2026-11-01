
const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

// Submit a new complaint
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      priority,
    } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      priority,
      submittedBy: req.user.userId,
    });

    return res.status(201).json({
      message: "Complaint submitted successfully.",
      complaint,
    });
  } catch (error) {
    console.error("Complaint submission error:", error);

    return res.status(500).json({
      message: "Failed to submit complaint.",
    });
  }
});

// Get complaints submitted by the logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      submittedBy: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("Fetch complaints error:", error);

    return res.status(500).json({
      message: "Failed to fetch complaints.",
    });
  }
});

module.exports = router;
