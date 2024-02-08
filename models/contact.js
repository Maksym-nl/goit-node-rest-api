import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongoosErr from "../helpers/handleMongoosErr.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
contactSchema.post("save", handleMongoosErr);

const Contact = model("contact", contactSchema);

export default Contact;
