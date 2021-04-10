import validationMiddleware from '../../middlewares/validation';

import PartnerController from './controller';
import { CreatePartnerDto, FindOnePartnerParamDto, UpdatePartnerDto } from './dto';
import PartnerModel from './model';
import PartnerService from './service';
import { Application } from 'express';
import { Knex } from 'knex';
import { BaseModule } from '..';

export default class PartnerModule extends BaseModule {
  path = '/partners';
  controller: PartnerController;
  service: PartnerService;
  model: PartnerModel;

  constructor(db: Knex) {
    super(db);

    this.model = new PartnerModel(db);
    this.service = new PartnerService(this.model);
    this.controller = new PartnerController(this.service);
  }

  initializeRoutes(app: Application) {
    app.get(`${this.path}`, this.controller.getPartners);

    app.post(
      `${this.path}`,
      validationMiddleware([{ type: CreatePartnerDto, value: 'body' }]),
      this.controller.createPartner
    );

    app.put(
      `${this.path}/:partnerId`,
      validationMiddleware([
        { type: FindOnePartnerParamDto, value: 'params' },
        { type: UpdatePartnerDto, value: 'body' }
      ]),
      this.controller.updatePartner
    );

    app.delete(
      `${this.path}/:partnerId`,
      validationMiddleware([{ type: FindOnePartnerParamDto, value: 'params' }]),
      this.controller.deletePartner
    );
  }
}
