'use strict';

const { Router } = require('express');

const Recipe = require('../models/recipe');

const router = new Router();

const routeGuard = require('./../middleware/route-guard');

// All recipe categories
router.get('/', routeGuard, (req, res, next) => {
  // Perform some checks on some variables that could be there or not -> The query params
  const { category } = req.query;
  console.log('THIS IS THE CATEGORY: ', category);
  Recipe.find({ category })
    .then((recipes) => {
      // console.log(recipes);
      res.render('recipes/recipes', { recipes });
    })
    .catch((error) => {
      next(error);
    });
});

/* Cheap version
router.get('/category', (req, res, next) => {
 Recipe.find({ category: { $all: ['breakfast'] } })
    .then((recipes) => {
      res.render('recipes/categories/breakfast', { recipes });
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

module.exports = router;
