import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    unitPrice: Joi.number().required(),
    notes: Joi.string().allow(''),
  },
});
