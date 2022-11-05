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
    const splittedIngrediends = ingredients.split(',');
    Recipe.create({
      category,
      // picture: picture,
      title,
      splittedIngrediends,
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

// Render recipes published by user
publicationRouter.get('/published', routeGuard, (req, res, next) => {
  res.render('recipes/user-recipes');
});

module.exports = publicationRouter;
