import { Router } from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const router = Router();

// GET ALL PRODUCTS
router.get('/', getProducts);

// GET PRODUCT BY ID
router.get('/:id', getProductById);

// CREATE PRODUCT
router.post('/', createProduct);

// UPDATE PRODUCT
router.put('/:id', updateProduct);

// DELETE PRODUCT
router.delete('/:id', deleteProduct);

export default router;