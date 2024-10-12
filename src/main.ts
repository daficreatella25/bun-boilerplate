import { AppModule } from './app.module';

const appModule = new AppModule();
const app = appModule.getApp();

export default {
  port: 3000,
  fetch: app.fetch,
};
