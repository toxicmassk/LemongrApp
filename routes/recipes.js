'use strict';

const { Router } = require('express');

const Recipe = require('../models/recipe');

const router = new Router();

const routeGuard = require('./../middleware/route-guard');

// All recipe categories
router.get('/', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/recipes', { recipes });
    })
    .catch((error) => {
      next(error);
    });
});

// Recipes by category
router.get('/category', routeGuard, (req, res, next) => {
  // Perform some checks on some variables that could be there or not -> The query params
  const { category } = req.query;
  console.log('THIS IS THE CATEGORY: ', category);
  Recipe.find({ category })
    .then((recipes) => {
      //console.log({ recipes, categoryParent: category });
      res.render('recipes/category', { recipes, categoryParent: category });
    })
    .catch((error) => {
      next(error);
    });
});

// Single recipe
router.get('/category/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((recipe) => {
      res.render('recipes/single-recipe', { recipe });
    })
    .catch((error) => {
      next(error);
    });
});

// Ingredients search
router.get('/search', routeGuard, (req, res, next) => {
  const { alkalinefood } = req.query;
  Recipe.find({ alkalinefood })
    .then((recipes) => {
      res.render('recipes/search', {
        recipes,
        alkalinefoodParent: alkalinefood
      });
      if (!alkalinefood || recipes.length <= 0) {
        res.render('recipes/recipes', {
          noRecipes: true,
          error: 'This might not be alkaline'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Render list of alkaline food
router.get('/food-list', routeGuard, (req, res, next) => {
  res.render('recipes/food-list');
});

module.exports = router;
