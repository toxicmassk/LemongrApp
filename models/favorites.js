'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true
    },
    recipe: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model('Favorites', schema);

module.exports = Favorites;
