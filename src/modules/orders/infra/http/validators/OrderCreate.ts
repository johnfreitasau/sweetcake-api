import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    customerId: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    isPaid: Joi.boolean(),
    isPickup: Joi.boolean(),
    deliveryFee: Joi.string(),
    deliveryDate: Joi.date(),
    products: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().uuid({ version: 'uuidv4' }).required(),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .required(),

    // email: Joi.string().email().required(),
    // phoneNumber: Joi.string(),
    // address: Joi.string(),
    // city: Joi.string(),
    // postalCode: Joi.string(),
    // notes: Joi.string(),
  },
});
