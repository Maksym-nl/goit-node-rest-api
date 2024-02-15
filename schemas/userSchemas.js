import Joi from "joi";

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const data = {
  userSchema,
};
export default data;
