'use strict';

const { Router } = require('express');

const Selfcare = require('../models/selfcare');

const router = new Router();

const routeGuard = require('./../middleware/route-guard');

// All recipe categories
router.get('/', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((selfcare) => {
      res.render('selfcare/selfcare', { selfcare });
    })
    .catch((error) => {
      res.redirect('/');
    });
});

router.get('/selfcare/bodycare', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((selfcare) => {
      res.render('selfcare/bodycare', { selfcare });
    })
    .catch((error) => {
      res.redirect('/selfcare');
    });
});

router.get('/selfcare/breathing-excersice', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((recipes) => {
      res.render('selfcare/breathing-excersice', { selfcare });
    })
    .catch((error) => {
      res.redirect('/selfcare');
    });
});

router.get('/selfcare/cosmetics', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((selfcare) => {
      res.render('selfcare/cosmetics', { selfcare });
    })
    .catch((error) => {
      res.redirect('/selfcare');
    });
});

router.get('/selfcare/yoga', routeGuard, (req, res, next) => {
  Selfcare.find()
    .then((selfcare) => {
      res.render('selfcare/yoga', { selfcare });
    })
    .catch((error) => {
      res.redirect('/selfcare');
    });
});

module.exports = router;
