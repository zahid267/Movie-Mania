const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const wishlistSchema = new Schema({
  name: [
    {
      type: String,
    },
  ],
  cast: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  released: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  review: {
    type: String,
  }
});

module.exports = wishlistSchema;
