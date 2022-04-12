import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getRecipes,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../controllers/recipeController.js';

const router = express.Router();

router.route('/').post(authMiddleware, addFavoriteRecipe);
router
  .route('/:id')
  .get(authMiddleware, getRecipes)
  .delete(authMiddleware, deleteFavoriteRecipe);
export default router;
