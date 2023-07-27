import { Repository } from "typeorm";
import { TContact, TContactRequest } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities";
import { AppDataSource } from "../../data-source";

const updateUserContactService = async (
  contactEmail: string,
  data: TContactRequest
): Promise<TContact> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  let contact: TContact | null = await contactRepository.findOne({
    where: {
      email: contactEmail,
    },
  });

  contact = {
    ...contact!,
    ...data,
  };

  await contactRepository.save(contact);

  return contact;
};

export default updateUserContactService;
