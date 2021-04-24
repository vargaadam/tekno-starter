import App from './app';
import { BaseModule } from './modules';
import PartnerModule from './modules/partner';

const app = new App<BaseModule>([PartnerModule]);

app.listen();
