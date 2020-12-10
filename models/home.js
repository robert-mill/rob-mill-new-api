const Joi = require("joi");
const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  section:{
    type: String,
    required: true,
  },
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  }
});

const Home = mongoose.model("Home", HomeSchema);

function validateDuHome(home) {
  const schema = {
    section: Joi.string().required(),
    heading: Joi.string().required(),
    body: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().allow("").optional(),
  };

  return Joi.validate(home, schema);
}

exports.HomeSchema = HomeSchema;
exports.Home = Home;
exports.validate = validateDuHome;
