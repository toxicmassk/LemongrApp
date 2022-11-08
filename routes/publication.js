'use strict';

const express = require('express');
const publicationRouter = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const Recipe = require('./../models/recipe');
const routeGuard = require('./../middleware/route-guard');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const upload = multer({ storage: storage });

// Render recipes create page
publicationRouter.get('/', routeGuard, (req, res, next) => {
  res.render('recipes/new-recipe');
});

// Create recipe
publicationRouter.post(
  '/',
  routeGuard,
  upload.single('picture'),
  (req, res, next) => {
    console.log('BODY: ', req.body);
    // const url = req.file.path;
    const { category, title, ingredients, instruction } = req.body;
    const author = req.user._id;
    // if my ingredients string is 'egg, milk, flour' -> ['egg','milk','flour']
    console.log('INGREDIENTS', ingredients);
    // const splittedIngrediends = ingredients.slice(',');
    Recipe.create({
      category,
      // picture: picture,
      title,
      ingredients,
      // splittedIngrediends,
      instruction,
      author
    })
      .then((publication) => {
        console.log(publication);
        res.redirect(`/recipes/category/${publication._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

/* Humble try to use one input at a time
publicationRouter.post('/', routeGuard, (req, res, next) => {
  const { category, title, ingredients, instruction } = req.body;
  const author = req.user._id;
  Recipe.create({
    category,
    // picture: picture,
    title,
    ingredients,
    instruction,
    author
  })
    .then((publication) => {
      res.redirect(`/recipes/category/${publication._id}`);
      if (publication) {
        res.render('create', {
          oneIngredient: true
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});
*/

// Render recipes published by user and add them to the /published site
publicationRouter.get('/published', routeGuard, (req, res, next) => {
  Recipe.find({ user: req.user._id })
    .populate('publication')
    .then(() => {
      res.render('recipes/user-recipes', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = publicationRouter;
