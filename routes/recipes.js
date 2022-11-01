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
      res.redirect('/');
    });
});

// Each category with its recipes
router.get('/category', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/category', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

/* Another version
router.get('/category', (req, res, next) => {
 Recipe.find({ category: { $all: ['breakfast'] } })
    .then((recipes) => {
      res.render('recipes/partials/breakfast', { recipes });
    })
    .catch((error) => {
      res.redirect('/');
    });
});
*/

// Single recipe
router.get('/category/:id', routeGuard, (req, res, next) => {
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
      res.render('recipes/category/breakfast', { recipes });
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
