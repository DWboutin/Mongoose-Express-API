import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
  title: { type: String, required: true  },
  author: { type: String},
  tags: { type: String, required: true },
  code: { type: String, required: true, unique: true, index: true },
  created_at: Date,
  updated_at: Date
});

recipeSchema.pre('save', function(next) {

  var recipe = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  recipe.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!recipe.created_at){
    recipe.created_at = currentDate;
  }

  next();
});

let Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;