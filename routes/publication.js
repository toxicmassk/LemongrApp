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
  res.render('recipes/create-recipe');
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
      .then((publications) => {
        console.log(publications);
        res.redirect('/create/published'); //everything after the localhost
      })
      .catch((error) => {
        next(error);
      });
  }
);

// Render recipes published by user and add them to the /published site
publicationRouter.get(
  '/published', // Buggs here
  routeGuardMiddleware,
  (req, res, next) => {
    Recipe.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      //.populate('publication')
      .then((publications) => {
        console.log('publication', { publications });
        res.render('recipes/publications', { publications });
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = publicationRouter;
