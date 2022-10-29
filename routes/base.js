'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Welcome!' });
});

router.get('/account', routeGuard, (req, res, next) => {
  res.render('account');
});

module.exports = router;
