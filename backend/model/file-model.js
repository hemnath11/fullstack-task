const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  file_path: { type: String, unique: true, required: true },
  user_id: { type: String, required: true },
  meta_data: { type: Object, required: true },
});
module.exports = mongoose.model("Files", fileSchema);
