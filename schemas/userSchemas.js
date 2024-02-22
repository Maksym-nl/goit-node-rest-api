import Joi from "joi";

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});
const data = {
  userSchema,
  emailSchema,
};
export default data;
