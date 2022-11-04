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
router.post('/account', routeGuard, (req, res, next) => {
  const { phrase } = req.query;
  Lemonphrase.find()
    .then((phrase) => {
      res.send({ phrase });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
