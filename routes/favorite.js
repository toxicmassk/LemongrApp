// here we're going to list the routes for favorite recipes
'use strict';

const express = require('express');
const Favorite = require('./../models/favorite');
const routeGuardMiddleware = require('./../middleware/route-guard');
const Recipe = require('./../models/recipe');
const User = require('./../models/user');

const favoriteRouter = express.Router();

favoriteRouter.get('/', routeGuardMiddleware, (req, res, next) => {
  Favorite.find({ user: req.user._id })
    .populate('recipe')
    .then((favorites) => {
      console.log('favorites', { favorites });
      res.render('favorites/favorite', { favorites });
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/recipes');
    });
});

// Find on favorites method, pass an object to filter results! User.id o
// Req.user_id

// Post requests for favorite recipe
favoriteRouter.post('/:recipeId', routeGuardMiddleware, (req, res, next) => {
  const { recipeId } = req.params;
  Favorite.create({
    user: req.user._id,
    recipe: recipeId
  })
    .then(() => {
      res.redirect('/'); // maybe change redirection
    })
    .catch((error) => {
      next(error);
    });
});
// Post request for unfavorite recipe
favoriteRouter.post(
  '/:recipeId/unfavorite',
  routeGuardMiddleware,
  (req, res, next) => {
    const { recipeId } = req.params;
    Favorite.findOneAndDelete({
      user: req.user._id,
      recipe: recipeId
    })
      .then(() => {
        res.redirect('/'); // maybe change redirection
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = favoriteRouter;
