const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authenticate = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/checkRole");

router.post("/", bookController.createBook);
router.get("/book-add-form", bookController.getBookAddForm);
router.post("/add-book", bookController.addBook);
router.get("/", authenticate, bookController.getAllBooks);
router.get("/:bookId", bookController.bookById);
router.put("/:bookId", bookController.updateBook);
router.delete("/:bookId", authenticate, checkRole(["admin"]), bookController.deleteBook);

module.exports = router;
