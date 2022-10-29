'use strict';

const { Router } = require('express');

const Recipe = require('../models/recipe');

const router = new Router();

router.get('/', (req, res, next) => {
  res.render('recipes/recipes');
});

// like this possible?
router.get('/category', (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/category', { recipes });
    })
    .catch((error) => {
      next(error);
    });
});

/* OR...?
router.get('/breakfast', (req, res, next) => {
  res.render('recipes/category');
});

router.get('/lunch', (req, res, next) => {
  res.render('recipes/category');
});

router.get('/dinner', (req, res, next) => {
  res.render('recipes/category');
});

router.get('/snacks', (req, res, next) => {
  res.render('recipes/category');
});

router.get('/drinks', (req, res, next) => {
  res.render('recipes/category');
});

router.get('/:id', (req, res, next) => {
  res.render('recipes/single-recipe');
});
*/

module.exports = router;
