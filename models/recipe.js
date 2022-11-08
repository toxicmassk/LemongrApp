// 'use strict';

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Drinks']
    },
    picture: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030323.JPG/330px-P1030323.JPG',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: [
        {
          type: String,
          trim: true
        }
      ]
    },
    instruction: {
      type: String,
      required: true
    },
    alkalinefood: {
      type: [String]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    publication: {
      type: String
    }
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
