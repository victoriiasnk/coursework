const CategoryMoDel = require("../models/CategoryModel");

module.exports.getCategory = async (_, res) => {
  const category = await CategoryMoDel.find();
  res.send(category);
};

module.exports.saveCategory = async (req, res) => {
  const { text } = req.body;

  CategoryMoDel.create({ text }).then((data) => {
    console.log("Added Successfully...");
    console.log(data);
    res.send(data);
  });
};

module.exports.updateCategory = async (req, res) => {
  const { _id, ...items } = req.body;
  CategoryMoDel.findByIdAndUpdate(_id, { ...items })
    .then(() => res.send("Updates Successfully...."))
    .catch((err) => console.log(err));
};

module.exports.deleteCategory = async (req, res) => {
  const { _id } = req.body;
  CategoryMoDel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Successfully...."))
    .catch((err) => console.log(err));
};
