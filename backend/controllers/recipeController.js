import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';

/**
 * @desc Add all favorite recipes
 * @route GET /api/recipes/favorites
 * @access Private
 */
export const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({
    user: req.user._id,
  });

  if (recipes) {
    res.status(200);
    res.json(recipes);
  } else {
    res.status(400);
    throw new Error('Recipe not found');
  }
});

/**
 * @desc Add a favorite recipe
 * @route POST /api/recipes/favorites
 * @access Private
 */
export const addFavoriteRecipe = asyncHandler(async (req, res) => {
  const { recipe } = req.body;

  const newRecipe = new Recipe({
    user: req.user._id,
    recipe,
  });

  const addedRecipe = await newRecipe.save();

  if (addedRecipe) {
    res.status(201);
    res.json(addedRecipe);
  } else {
    res.status(400);
    throw new Error('Recipe not added');
  }
});

/**
 * @desc Remove a favorite recipe
 * @route DELETE /api/recipes/favotires
 * @access Private
 */
export const deleteFavoriteRecipe = asyncHandler(async (req, res) => {
  const recipeToDelete = await Recipe.findById(req.params.id);

  if (recipeToDelete) {
    const deleted = await recipeToDelete.remove();
    res.json(deleted);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});
