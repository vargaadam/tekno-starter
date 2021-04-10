import { BaseModel } from '..';

import { CreatePartnerDto, UpdatePartnerDto } from './dto';
import { IPartner } from './interface';

export default class PartnerModel extends BaseModel<IPartner> {
  tableName = 'partners';

  async findAll(): Promise<IPartner[]> {
    return this.queryBuilder.select();
  }

  async create(createPartnerDto: CreatePartnerDto): Promise<IPartner> {
    const createdUser = await this.queryBuilder.insert(createPartnerDto, '*');
    return createdUser[0];
  }

  async updateById(id: number, updatePartnerDto: UpdatePartnerDto): Promise<IPartner> {
    const updatedPartner = await this.queryBuilder.where({ id }).update(updatePartnerDto, '*');
    return updatedPartner[0];
  }

  async deleteById(id: number): Promise<IPartner> {
    const deletedPartner = await this.queryBuilder.where({ id }).del('*');
    return deletedPartner[0];
  }
}
