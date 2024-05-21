const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Tender = require("../models/Tender");

// Create a new tender
router.post("/", auth, async (req, res) => {
  const { tenderId, tenderSlNo, tenderTitle, publishedDate, link } = req.body;
  try {
    const tender = new Tender({
      tenderId,
      tenderSlNo,
      tenderTitle,
      publishedDate,
      link,
    });
    await tender.save();
    res.json(tender);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all tenders
router.get("/", auth, async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get a tender by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ msg: "Tender not found" });
    res.json(tender);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update a tender
router.put("/:id", auth, async (req, res) => {
  const { tenderId, tenderSlNo, tenderTitle, publishedDate, link } = req.body;
  try {
    const tender = await Tender.findByIdAndUpdate(
      req.params.id,
      { tenderId, tenderSlNo, tenderTitle, publishedDate, link },
      { new: true }
    );
    if (!tender) return res.status(404).json({ msg: "Tender not found" });
    res.json(tender);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete a tender
router.delete("/:id", auth, async (req, res) => {
  try {
    const tender = await Tender.findByIdAndRemove(req.params.id);
    if (!tender) return res.status(404).json({ msg: "Tender not found" });
    res.json({ msg: "Tender removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
