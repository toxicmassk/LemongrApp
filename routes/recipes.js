'use strict';

const { Router } = require('express');

const Recipe = require('../models/recipe');

const router = new Router();

// All recipe categories
router.get('/', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/recipes', { recipes });
    })
    .catch((error) => {
      res.redirect('/');
    });
});

// Each category with its recipes - creating the categories with partials?
router.get('/category', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/category', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

// Single recipe
router.get('/category/:id', (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((recipe) => {
      res.render('recipes/single-recipe', { recipe });
    })
    .catch((error) => {
      res.redirect('/recipes/category');
    });
});

/* OR...?
router.get('/category', (req, res, next) => {
  Recipe.find({category: 'breakfast'})
    .then((recipes) => {
      res.render('recipes/category', { recipes });
    })
    .catch((error) => {
      res.redirect('/');
    });
});


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
