const express = require("express");
const controller = require("../controllers/authors");

const router = express.Router();

// /api/book
router.get("/", controller.getAuthors);

module.exports = router;