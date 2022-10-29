'use strict';

const { Router } = require('express');

const Recipes = require('./../models/recipes');

const router = new Router();

router.get('/recipes', (req, res, next) => {
  // frage: solte es nicht nur '/' sein, kollidiertdann aber mit home?
  res.render('recipes');
});

router.get('/breakfast', (req, res, next) => {
  res.render('recipes/breakfast');
});

router.get('/breakfast/:id', (req, res, next) => {
  res.render('recipes/breakfast');
});

module.exports = router;

/*
GET - '/recipes/breakfast/:id‘ - Load a single breakfast recipe: Wibi 
GET - '/recipes/lunch‘ - Load all breakfast recipes: Wibi 
GET - '/recipes/lunch/:id‘ - Load a single breakfast recipe: Wibi 
GET - '/recipes/dinner‘ - Load all breakfast recipes: Wibi 
GET - '/recipes/dinner/:id‘ - Load a single breakfast recipe 
GET - '/recipes/snacks‘ - Load all breakfast recipes 
GET - '/recipes/snacks/:id‘ - Load a single breakfast recipe 
GET - '/recipes/drinks‘ - Load all breakfast recipes 
GET - '/recipes/drinks/:id‘ - Load a single breakfast recipe
*/
