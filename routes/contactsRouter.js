import express from "express";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";
import controllers from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} = controllers;

const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = schemas;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteContactSchema),
  updateFavoriteContact
);

export default contactsRouter;
