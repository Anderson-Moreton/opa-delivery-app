import { Router } from 'express';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getMenuCategories
} from '../controllers/category.controller';

const router = Router();

// GET
router.get('/', getCategories);

// GET MENU CATEGORIES
router.get('/menu', getMenuCategories);

// CREATE
router.post('/', createCategory);

// UPDATE
router.put('/:id', updateCategory);

// DELETE
router.delete('/:id', deleteCategory);

export default router;