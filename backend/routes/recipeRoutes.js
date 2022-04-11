import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getRecipes,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../controllers/recipeController.js';

const router = express.Router();

router
  .route('/')
  .get(authMiddleware, getRecipes)
  .post(authMiddleware, addFavoriteRecipe);
router.route('/:id').delete(authMiddleware, deleteFavoriteRecipe);
export default router;
