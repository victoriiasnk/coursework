const { Router } = require("express");
const {
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

const router = Router();

router.get("/", getCategory);
router.post("/save", saveCategory);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);

module.exports = router;
