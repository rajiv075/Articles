const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Article = require("../models/Article");
const { check, validationResult } = require("express-validator");

// @route   GET api/articles
// @desc    Get all articles
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
