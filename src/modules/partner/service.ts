import { CreatePartnerDto, UpdatePartnerDto } from './dto';
import { IPartner } from './interface';
import PartnerModel from './model';

export default class PartnerService {
  partnerModel: PartnerModel;

  constructor(partnerModel: PartnerModel) {
    this.partnerModel = partnerModel;
  }

  async findAllPartner(): Promise<IPartner[]> {
    return this.partnerModel.findAll();
  }

  async createPartner(createPartnerDto: CreatePartnerDto): Promise<IPartner> {
    return this.partnerModel.create(createPartnerDto);
  }

  async updatePartner(id: number, updatePartnerDto: UpdatePartnerDto): Promise<IPartner> {
    return this.partnerModel.updateById(id, updatePartnerDto);
  }

  async deletePartner(id: number): Promise<IPartner> {
    return this.partnerModel.deleteById(id);
  }
}
