const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    originalContent: { type: String },
    updatedContent: { type: String },
    status: {
      type: String,
      enum: ["original", "updated"],
      default: "original"
    },
    references: [
      {
        title: String,
        url: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
