const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category'); // Adjust the path as necessary

// Create a new category
router.post('/categories', categoryController.createCategory);

// Read all categories
router.get('/categories', categoryController.getAllCategories);

// Read a single category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/categories/:id', categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;