// const Category = require('../models/Category'); // Adjust the path as necessary
const Category=require("../models/category")
// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a category by ID
// exports.updateCategoryById = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['name'];
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }

//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (category[update] = req.body[update]));
//     await category.save();
//     res.status(200).send(category);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// Delete a category by ID
// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    category.name = req.body.name;
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send();
    }

    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};