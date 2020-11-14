import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});
