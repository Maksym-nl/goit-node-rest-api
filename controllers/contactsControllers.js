// import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import Contact from "../models/contact.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // const contacts = await Contact.find({ owner });
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;
  let result = null;
  if (favorite) {
    result = await Contact.find({ owner, favorite }, "-createAt -updeteAt", {
      skip,
      limit,
    }).populate("owner", "name email");
  } else {
    result = await Contact.find({ owner }, "-createAt -updeteAt", {
      skip,
      limit,
    }).populate("owner", "name email");
  }
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contactOne = await Contact.findOne({ owner, _id: id });
  if (!contactOne) {
    throw HttpError(404);
  }
  res.json(contactOne);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const removedContact = await Contact.findOneAndDelete({ owner, _id: id });
  if (!removedContact) {
    throw HttpError(404);
  }
  res.json(removedContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone, owner });

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { body } = req;
  if (!Object.keys(body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { body } = req;

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
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
