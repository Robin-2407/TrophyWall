const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['trophy', 'certificate']
  },
  tags: [{ type: String }],
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  imageUrl: { type: String },
  credentialId: { type: String },
  expiryDate: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// Add index for better query performance
achievementSchema.index({ tags: 1, type: 1 });

module.exports = mongoose.model("Achievement", achievementSchema);
