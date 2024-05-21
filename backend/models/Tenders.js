const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenderSchema = new Schema({
  tenderId: { type: String, required: true, unique: true },
  tenderSlNo: { type: String, required: true },
  tenderTitle: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Tender", TenderSchema);
