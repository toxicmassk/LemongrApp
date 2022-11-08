'use strict';

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const Recipe = require('./../models/recipe');
const routeGuardMiddleware = require('./../middleware/route-guard');

const publicationRouter = express.Router();

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const upload = multer({ storage: storage });

// Render recipes create page
publicationRouter.get('/', routeGuardMiddleware, (req, res, next) => {
  res.render('recipes/new-recipe');
});

// Create recipe
publicationRouter.post(
  '/',
  routeGuardMiddleware,
  upload.single('picture'),
  (req, res, next) => {
    console.log('BODY: ', req.body);
    const picture = req.file.path;
    const { category, title, ingredients, instruction } = req.body;
    const author = req.user._id;
    // if my ingredients string is 'egg, milk, flour' -> ['egg','milk','flour']
    console.log('INGREDIENTS', ingredients);
    const splitIngredientList = ingredients.split(',');
    Recipe.create({
      category,
      picture,
      title,
      ingredients: splitIngredientList,
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
publicationRouter.get('/published', routeGuardMiddleware, (req, res, next) => {
  Recipe.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('publication')
    .then((publications) => {
      res.render('recipes/user-recipes', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = publicationRouter;
