const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

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
      isAssigned: false,
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

// STAFF: Get assigned complaints
router.get("/staff/assigned", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "staff") {
      return res.status(403).json({
        message: "Access denied. Staff only.",
      });
    }

    const complaints = await Complaint.find({
      isAssigned: true,
    })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("Fetch assigned complaints error:", error);

    return res.status(500).json({
      message: "Failed to fetch assigned complaints.",
    });
  }
});

// ADMIN: Get all complaints
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const complaints = await Complaint.find()
        .populate("submittedBy", "name email")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        count: complaints.length,
        complaints,
      });
    } catch (error) {
      console.error("Admin fetch complaints error:", error);

      return res.status(500).json({
        message: "Failed to fetch all complaints.",
      });
    }
  }
);

// ADMIN: Toggle assignment status
router.patch(
  "/admin/:id/assign",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { isAssigned } = req.body;

      if (typeof isAssigned !== "boolean") {
        return res.status(400).json({
          message: "isAssigned must be true or false.",
        });
      }

      const complaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        { isAssigned },
        { new: true, runValidators: true }
      ).populate("submittedBy", "name email");

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found.",
        });
      }

      return res.status(200).json({
        message: `Complaint marked as ${
          isAssigned ? "Assigned" : "Unassigned"
        }.`,
        complaint,
      });
    } catch (error) {
      console.error("Update assignment error:", error);

      return res.status(500).json({
        message: "Failed to update assignment.",
      });
    }
  }
);

// ADMIN: Update complaint status
router.patch(
  "/admin/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Submitted",
        "In Progress",
        "Resolved",
        "Rejected",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid complaint status.",
        });
      }

      const complaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found.",
        });
      }

      return res.status(200).json({
        message: "Complaint status updated successfully.",
        complaint,
      });
    } catch (error) {
      console.error("Admin update status error:", error);

      return res.status(500).json({
        message: "Failed to update complaint status.",
      });
    }
  }
);

module.exports = router;