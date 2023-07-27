import { Request, Response } from "express";
import { TContact, TContactRequest } from "../interfaces/contact.interfaces";
import createContactService from "../services/contact/createContact.service";
import getAllContactsService from "../services/contact/getAllContacts.service";
import getUserContactService from "../services/contact/getUserContact.service";
import updateUserContactService from "../services/contact/updateContact.service";
import deleteUserContactService from "../services/contact/deleteUserContact.service";

const createContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;
  const data: TContactRequest = request.body;

  const contact: TContact = await createContactService(userId, data);

  return response.status(201).json(contact);
};

const getAllContactsControllers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;

  const contacts: TContact[] = await getAllContactsService(userId);

  return response.json(contacts);
};

const getUserContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;

  const contactEmail: string = request.params.email;

  const contact: TContact = await getUserContactService(userId, contactEmail);

  return response.json(contact);
};

const updateUserContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const contactEmail: string = request.params.email;

  const data: TContactRequest = request.body;

  const contact: TContact = await updateUserContactService(contactEmail, data);

  return response.json(contact);
};

const deleteUserContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: string = response.locals.user.id;

  const contactEmail: string = request.params.email;

  await deleteUserContactService(contactEmail, userId);

  return response.status(204);
};

export {
  createContactController,
  getAllContactsControllers,
  getUserContactController,
  updateUserContactController,
  deleteUserContactController,
};
