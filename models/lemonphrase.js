'use strict';

const mongoose = require('mongoose');

const lemonphraseSchema = new mongoose.Schema(
  {
    phrase: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Lemonphrase = mongoose.model('Lemonphrase', lemonphraseSchema);

module.exports = Lemonphrase;
