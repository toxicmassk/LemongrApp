// here we're going to list the routes for favorite recipes
'use strict';

const express = require('express');
const Favorite = require('./../models/favorite');
const routeGuardMiddleware = require('./../middleware/route-guard');
const Recipe = require('./../models/recipe');
const User = require('./../models/user');

const favoriteRouter = express.Router();

// GET ALL FAVORITES LINKED WITH LOGGED-IN USER
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

// Delete request for unfavorite recipe
favoriteRouter.post(
  '/:recipeId/unfavorite',
  routeGuardMiddleware,
  (req, res, next) => {
    const { recipeId } = req.params;
    const { category } = req.query;
    Favorite.findOneAndDelete({
      user: req.user._id,
      recipe: recipeId
    })
      .then(() => {
        res.redirect(`/recipes/category?category=${category}`); // maybe change redirection
      })
      .catch((error) => {
        next(error);
      });
  }
);

// Post requests for favorite recipe
favoriteRouter.post('/:recipeId/', routeGuardMiddleware, (req, res, next) => {
  const { recipeId } = req.params;
  const { category } = req.query;
  Favorite.findOne({
    user: req.user._id,
    recipe: recipeId
  })
    .then((favorite) => {
      console.log('FAVORITE: ', favorite);
      if (favorite) {
        const error = new Error(
          "You've already added a Favorite to this recipe!"
        );
        throw error;
      } else {
        return Favorite.create({
          user: req.user._id,
          recipe: recipeId
        });
      }
    })
    .then(() => {
      res.redirect(`/recipes/category?category=${category}`); // maybe change redirection
    })
    .catch((error) => {
      next(error);
    });
});

//HTTP METHODS
// GET - commonly used to fetch information from a server
// POST - commonly used to post information to a server (e.g. create a new document in the database)
// PUT - commonly used to edit information in the database
// PATCH - similar to PUT
// DELETE - commonly used to issue requests to the server in order to delete a document in the database

module.exports = favoriteRouter;
