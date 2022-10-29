'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Recipe'
    }
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', schema);

module.exports = Favorite;
