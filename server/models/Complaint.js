const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Electrical",
                "Plumbing",
                "Cleanliness",
                "Infrastructure",
                "Internet",
                "Other",
            ],
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        status: {
            type: String,
            enum: ["Submitted", "In Progress", "Resolved", "Rejected"],
            default: "Submitted",
        },

        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
isAssigned: {
  type: Boolean,
  default: false,
},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);