import express  from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController.js';

const router = express.Router()

router.route('/products').get(getAllProducts).post(createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

export default router;