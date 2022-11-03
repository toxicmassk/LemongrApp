'use strict';

const mongoose = require('mongoose');

const lemonphraseSchema = new mongoose.Schema(
  {
    phrase: {
      type: String,
      required: true,
      enum: [
        'Easy peasy lemon squeeze!',
        'If life gives you lemons make lemonade!',
        'Squeez the day',
        'The sweet just isn´t as sweet without the sour'
      ]
    }
  },
  { timestamps: true }
);

const Lemonphrase = mongoose.model('Lemonphrase', lemonphraseSchema);

module.exports = Lemonphrase;
