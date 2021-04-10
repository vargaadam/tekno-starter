import { NextFunction, Request, Response } from 'express';

import { IPartner } from './interface';
import { CreatePartnerDto, FindOnePartnerParamDto, UpdatePartnerDto } from './dto';
import PartnerService from './service';

export default class PartnerController {
  partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  getPartners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPartnerData: IPartner[] = await this.partnerService.findAllPartner();

      res.status(200).json({ data: findAllPartnerData });
    } catch (error) {
      next(error);
    }
  };

  createPartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createPartnerDto: CreatePartnerDto = req.body;
      const createdPartner: IPartner = await this.partnerService.createPartner(createPartnerDto);

      res.status(201).json({ data: createdPartner });
    } catch (error) {
      next(error);
    }
  };

  updatePartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatePartnerDto: UpdatePartnerDto = req.body;
      const findOneParams = (req.params as unknown) as FindOnePartnerParamDto;

      const updatedPartner: IPartner = await this.partnerService.updatePartner(
        Number(findOneParams.partnerId),
        updatePartnerDto
      );

      res.status(200).json({ data: updatedPartner });
    } catch (error) {
      next(error);
    }
  };

  deletePartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findOneParams = (req.params as unknown) as FindOnePartnerParamDto;

      const deletedPartner: IPartner = await this.partnerService.deletePartner(Number(findOneParams.partnerId));

      res.status(200).json({ data: deletedPartner });
    } catch (error) {
      next(error);
    }
  };
}
