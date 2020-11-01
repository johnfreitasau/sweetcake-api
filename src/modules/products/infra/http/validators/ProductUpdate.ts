import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    category: Joi.string().required(),
    unitPrice: Joi.number().required(),
    qtyDiscount: Joi.number().optional(),
    discount: Joi.number().optional(),
    notes: Joi.string().allow(''),
  },
});
