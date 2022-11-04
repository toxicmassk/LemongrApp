'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

const Lemonphrase = require('../models/lemonphrase');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Welcome!' });
});

router.get('/account', routeGuard, (req, res, next) => {
  res.render('account/account');
});

// Lemonphrase
router.get('/account', routeGuard, (req, res, next) => {
  Lemonphrase.find()
    .then((phrase) => {
      res.render('account', { phraseParent: phrase });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
