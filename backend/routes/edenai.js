const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const upload = multer();

router.post("/recognize", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("providers", "google");
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const edenRes = await axios.post("https://api.edenai.run/v2/image/label_detection", formData, {
      headers: {
        Authorization: `Bearer ${process.env.EDENAI_API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    res.json(edenRes.data);
  } catch (err) {
    console.error("Eden AI error:", err.message);
    res.status(500).json({ error: "Image recognition failed" });
  }
});

module.exports = router;
