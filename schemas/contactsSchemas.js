import Joi from "joi";

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updateContactSchema = Joi.object({});

const data = { createContactSchema, updateContactSchema };
export default data;
