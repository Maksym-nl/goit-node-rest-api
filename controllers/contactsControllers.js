import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";

const { listContacts, getContactById, removeContact, addContact } =
  contactsService;
const { createContactSchema, updateContactSchema } = schemas;

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const contactOne = await getContactById(id);
  if (!contactOne) {
    return HttpError(404);
  }
  res.json(contactOne);
};

const deleteContact = async (req, res) => {
  const removedContact = await removeContact(id);
  if (!removedContact) {
    return HttpError(404);
  }
  res.json(removeContact);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  createContactSchema.validateAsync({ name, email, phone });
  const newContact = await addContact({ name, email, phone });

  res.status(201).json(newContact);
};

const updateContact = (req, res) => {};

const data = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
export default data;
