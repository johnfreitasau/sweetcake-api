import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    customerId: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    isPaid: Joi.boolean(),
    isPickup: Joi.boolean(),
    deliveryFee: Joi.number().min(0),
    deliveryDate: Joi.date(),
    products: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string()
            .uuid({ version: 'uuidv4' })
            .default('ffbdfe9b-49d6-485b-a4d4-6527e748b272'),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .required(),
  },
});
