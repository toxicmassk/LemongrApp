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
router.get('/category/breakfast', routeGuard, (req, res, next) => {
  //  Recipe.find({ category: { $all: ['breakfast'] } })
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/breakfast', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

router.get('/category/lunch', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/lunch', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

router.get('/category/dinner', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/dinner', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

router.get('/category/snacks', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/snacks', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

router.get('/category/sweets', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/sweets', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
    });
});

router.get('/category/drinks', routeGuard, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.render('recipes/categories/drinks', { recipes });
    })
    .catch((error) => {
      res.redirect('/recipes');
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
