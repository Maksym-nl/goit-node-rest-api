// import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";
import Contact from "../models/contact.js";

const { createContactSchema, updateContactSchema } = schemas;

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contactOne = await Contact.findById(id);
  if (!contactOne) {
    throw HttpError(404);
  }
  res.json(contactOne);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(404);
  }
  res.json(removedContact);
};

const createContact = async (req, res) => {
  // validateBody(createContactSchema);
  const { name, email, phone } = req.body;
  createContactSchema.validateAsync({ name, email, phone });
  const newContact = await Contact.create({ name, email, phone });

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  validateBody(updateContactSchema);
  const { id } = req.params;
  const { body } = req;
  if (!Object.keys(body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const result = await Contact.findByIdAndUpdate({ id, ...body });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const data = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
export default data;
