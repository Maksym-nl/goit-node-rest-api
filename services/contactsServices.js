// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.resolve("db", "contacts.json");
// // ...твій код. Повертає масив контактів.
// async function listContacts() {
//   const data = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(data);
// }

// // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
// async function getContactById(contactId) {
//   const contacts = await listContacts();

//   const contact = contacts.find((contact) => contact.id === contactId);
//   if (contact) {
//     return contact;
//   } else {
//     return null;
//   }
// }
// // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
// async function removeContact(contactId) {
//   const contacts = await listContacts();

//   const contact = contacts.find((contact) => contact.id === contactId);
//   if (contact) {
//     const newContacts = contacts.filter((contact) => contact.id !== contactId);
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

//     return contact;
//   } else {
//     return null;
//   }
// }
// // ...твій код. Повертає об'єкт доданого контакту (з id).
// async function addContact({ name, email, phone }) {
//   const newContact = { name, email, phone, id: nanoid() };
//   const contacts = await listContacts();

//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }
// async function editContact(edidedContact) {
//   const contacts = await listContacts();

//   const contact = contacts.find((contact) => contact.id === edidedContact.id);
//   if (contact) {
//     const newContacts = contacts.map((contact) =>
//       contact.id !== edidedContact.id ? contact : edidedContact
//     );
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

//     return edidedContact;
//   } else {
//     return null;
//   }
// }
// const data = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   editContact,
// };
// export default data;
