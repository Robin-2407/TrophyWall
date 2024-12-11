const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Authentication fields
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Trophy system integration
  trophies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trophy" }],

  // Profile data
  profilePicture: {
    type: String,
    default:
      "https://imgs.search.brave.com/gLF1pdrwGEEyBOmckgqyAaa-vhfSnycQKWgrTqjP-GE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDc2/MDg1MTk4L3Bob3Rv/L2J1c2luZXNzbWFu/LXNpbGhvdWV0dGUt/YXMtYXZhdGFyLW9y/LWRlZmF1bHQtcHJv/ZmlsZS1waWN0dXJl/LmpwZz9iPTEmcz02/MTJ4NjEyJnc9MCZr/PTIwJmM9UGRDcHFx/Vl9obUtsVzBvOHQy/VFB3REVuT1dCR1N5/Yk9FNE5pQjhDdndv/RT0",
  },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model("User", userSchema);
