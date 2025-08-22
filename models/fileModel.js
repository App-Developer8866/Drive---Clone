const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileData: {
    type: Buffer,
    required: [true, "File is required"],
  },
  fileName: {
    type: String,
    required: [true, "File name is required"],
  },
  fileType: {
    type: String,
    required: [true, "File type is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

const fileModel = mongoose.model("File", fileSchema);
module.exports = fileModel;
