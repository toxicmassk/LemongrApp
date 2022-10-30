'use strict';

const { Router } = require('express');

const Recipe = require('../models/recipe');

const router = new Router();

// All recipes of any category
router.get('/', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/recipes', { recipes });
    })
    .catch((error) => {
      next(error);
    });
});

// Each recipe category - creating the categories with partials?
router.get('/category', (req, res, next) => {
  res.render('recipes/category');
});

// Single recipe
router.get('/category/:id', (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((recipe) => {
      res.render('recipes/single-recipe', { recipe });
    })
    .catch((error) => {
      next(error);
    });
});

/* OR...?
router.get('/breakfast', (req, res, next) => {
  res.render('recipes/breakfast');
});

router.get('/lunch', (req, res, next) => {
  res.render('recipes/lunch');
});

router.get('/dinner', (req, res, next) => {
  res.render('recipes/dinner');
});

router.get('/snacks', (req, res, next) => {
  res.render('recipes/snacks');
});

router.get('/drinks', (req, res, next) => {
  res.render('recipes/drinks');
});
*/

module.exports = router;
