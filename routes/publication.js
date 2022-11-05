'use strict';

const express = require('express');
const publicationRouter = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const Publication = require('./../models/recipe');
const routeGuard = require('./../middleware/route-guard');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const upload = multer({ storage: storage });

// Render recipes create page
publicationRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('recipes/new-recipe');
});

// Create recipe
publicationRouter.post(
  '/create',
  routeGuard,
  upload.single('picture'),
  (req, res, next) => {
    const url = req.file.path;
    const { category, picture, title, ingredients, instruction, alkalinefood } =
      req.body;
    const author = req.user._id;
    Recipe.create({
      category,
      picture,
      title,
      ingredients,
      instruction,
      alkalinefood
    })
      .then((publication) => {
        res.redirect('/recipes');
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = publicationRouter;
