'use strict';

const { Router } = require('express');

const Selfcare = require('../models/selfcare');

const router = new Router();

const routeGuard = require('./../middleware/route-guard');

// All Selfcare categories
router.get('/', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((selfcare) => {
      res.render('selfcare/selfcare', { selfcare });
    })
    .catch((error) => {
      res.redirect('/');
    });
});

// Selfcare by categorie
router.get('/category', routeGuard, (req, res, next) => {
  // Perform some checks on some variables that could be there or not -> The query params
  const { category } = req.query;
  Selfcare.find({ category })
    .then((recipes) => {
      // console.log(recipes);
      res.render('selfcare/category', { selfcare });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
