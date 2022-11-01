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
    .then((favorites) => {
      res.render('favorites/favorite', { favorite });
    })
    .catch((error) => {
      res.redirect('/');
    });
});

// get favorite, not sure if this is correct ..
favoriteRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let recipe, favorite;
  Recipe.findById(id)
    .then((recipeDocument) => {
      recipe = recipeDocument;
      return Favorite.find({
        recipe: id
      })
        .sort({ createdAt: -1 })
        .populate('recipe');
    })
    .then((favoriteDocuments) => {
      favorite = favoriteDocuments;
      if (req.recipe) {
        return Favorite.findOne({
          user: req.user._id,
          recipe: id
        });
      } else {
        return null;
      }
    })
    .then((favorite) => {
      // We're only evaluating the expression String(req.user._id) === id
      // if we know we have an authenticated user
      const isOwnRecipe /* Profile*/ = req.favorite
        ? String(req.recipe._id) === id
        : false;
      const recipesFavorites = favorite.map((favorite) =>
        favorite.getAddedInformation(req.recipe ? req.recipe._id : null)
      );
      res.render('recipe/detail', {
        account: user,
        recipe: recipesFavorites,
        favorite,
        isOwnRecipe
      });
    })
    .catch((error) => {
      next(error);
    });
});

// Post requests for favorite recipe
favoriteRouter.post('/:recipeId', routeGuardMiddleware, (req, res, next) => {
  const { recipeId } = req.params;
  Favorite.create({
    user: req.user._id,
    recipe: recipeId
  })
    .then(() => {
      res.redirect(`/`); // maybe change redirection
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
        res.redirect(`/`); // maybe change redirection
      })
      .catch((error) => {
        next(error);
      });
  }
);

// This section needs to be written new above

module.exports = favoriteRouter;
