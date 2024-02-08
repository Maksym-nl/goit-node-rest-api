// import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import Contact from "../models/contact.js";

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
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!Object.keys(body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
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
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
export default data;
