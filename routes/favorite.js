// here we're going to list the routes for favorite recipes
'use strict';

const express = require('express');
const favoriteRouter = express.Router();
const Favorite = require('./../models/favorite');
const routeGuardMiddleware = require('./../middleware/route-guard');
const upload = require('./../upload');

// POST - '/create' - Handles publication creation form submission.
favoriteRouter.post(
  '/create',
  routeGuardMiddleware,
  upload.single('picture'),
  (req, res, next) => {
    const { message } = req.body;
    const author = req.user._id;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Favorite.create({
      picture
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

// GET - '/publication/:id/edit' - Load existing publication, render edit form.
favoriteRouter.get(
  '/:id/edit',
  routeGuardMiddleware,
  upload.single('picture'),
  (req, res, next) => {
    const { id } = req.params;
    Favorite.findById(id)
      .then((publication) => {
        res.render('favorite/edit', { favorite });
      })
      .catch((error) => {
        next(error);
      });
  }
);

// POST - '/:id/edit' - Handle publication edit form submission.
favoriteRouter.post(
  '/:id/edit',
  routeGuardMiddleware,
  upload.single('picture'),
  (req, res, next) => {
    const { id } = req.params;
    const { message } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    // We should prevent users from editing
    // publications for which they are not the author
    Favorite.findByIdAndUpdate(id, {
      picture // If picture is undefined, original picture remains
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

// POST - '/:id/delete' - Handle publication delete form submission.
favoriteRouter.post('/:id/delete', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  // We should prevent users from deleting
  // publications for which they are not the author
  Favorite.findByIdAndDelete(id)
    .then(() => {
      // Pseudo-code to delete image from database
      // cloudinary.v2.delete(publication.picture);
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = publicationRouter;
