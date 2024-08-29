const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(8).required(),
    lastname: Joi.string().min(3).max(8).required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.number(),
    password: Joi.string().min(3).max(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: " signup validation error", error });
  }
  next();
};

const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: " login validation error", error });
  }
  next();
};

module.exports = {
  signupValidation,
  signinValidation,
};
