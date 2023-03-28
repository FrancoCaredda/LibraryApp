const express = require("express");
const controller = require("../controllers/authors");

const router = express.Router();

// /api/authors
router.get("/", controller.getAuthors);
router.get("/:id", controller.getAuthor);
router.use(express.urlencoded());
router.post("/", controller.addAuthor);

module.exports = router;