const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model('category', CategorySchema);