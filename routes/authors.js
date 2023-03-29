const express = require("express");
const controller = require("../controllers/authors");

const router = express.Router();

// /api/authors
router.use(express.urlencoded());
router.get("/", controller.getAuthors);
router.route("/:id").get(controller.getAuthor)
                    .put(controller.updateAuthor)
                    .delete(controller.deleteAuthor);
router.post("/", controller.addAuthor);

module.exports = router;