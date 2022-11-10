'use strict';

const mongoose = require('mongoose');

const selfcareSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Breathing-excercise', 'Cosmetics', 'Bodycare']
    },
    picture: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Selfcare = mongoose.model('Selfcare', selfcareSchema);

module.exports = Selfcare;
