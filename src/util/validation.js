import Joi from 'joi';

const validateLGA = Joi.object({
  name: Joi.string().required(),
  male: Joi.number().integer().required(),
  female: Joi.number().integer().required()
});

const validateUpdateLGA = Joi.object({
  name: Joi.string().required(),
  male: Joi.number().integer().required(),
  female: Joi.number().integer().required()
});

const validateCountry = Joi.object({
  name: Joi.string().required()
});

const validateState = Joi.object({
  name: Joi.string().required()
});

export {
  validateCountry,
  validateState,
  validateLGA,
  validateUpdateLGA
};
