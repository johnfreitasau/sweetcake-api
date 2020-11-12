import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    customerId: Joi.string().required(),
    deliveryFee: Joi.number().min(0),
    deliveryDate: Joi.date(),
    paymentMethod: Joi.string().required(),
    isPaid: Joi.boolean(),
    isPickup: Joi.boolean(),
    products: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().uuid({ version: 'uuidv4' }),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .required(),
  },
});
