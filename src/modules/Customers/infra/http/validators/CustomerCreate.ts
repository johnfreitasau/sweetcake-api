import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    postalCode: Joi.string(),
    notes: Joi.string(),
  },
});
