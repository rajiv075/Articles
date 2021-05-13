const express = require("express");
const logger = require("../logger");
const router = express.Router();
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");

// @route   GET api/contacts
// @desc    Get all contacts of user
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    logger.error(err);
    logger.info(err.message);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private

router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      logger.error(err);
      logger.info(err.message);
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    logger.error(err);
    logger.info(err.message);
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    logger.error(err);
    logger.info(err.message);
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
