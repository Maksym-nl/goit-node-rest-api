import express from "express";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";
import controllers from "../controllers/contactsControllers.js";
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = controllers;

const { createContactSchema, updateContactSchema } = schemas;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;
