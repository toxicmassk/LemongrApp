'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

const Lemonphrase = require('../models/lemonphrase');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Welcome!' });
});

// Render /account & Lemonphrase
router.get('/account', routeGuard, (req, res, next) => {
  Lemonphrase.count({})
    .then((count) => {
      const random = Math.floor(Math.random() * count);
      return Lemonphrase.findOne({}).skip(random);
    })
    .then((randomPhrase) => {
      console.log(randomPhrase);
      res.render('account/account', { phrase: randomPhrase.phrase });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
