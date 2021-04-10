import { Knex } from 'knex';
import { IPartner } from '../../modules/partner/interface';

const partners: IPartner[] = [
  {
    id: 1,
    name: 'name1',
    mobile: 1234,
    bankAccountNumber: 1234,
    comment: 'comment'
  },
  {
    id: 2,
    name: 'name2',
    mobile: 1234,
    bankAccountNumber: 1234,
    comment: 'comment2'
  }
];

export const seed = async (knex: Knex): Promise<void> => {
  await knex('partners').insert(partners);
};
