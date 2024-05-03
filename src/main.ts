import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const initApplication = (app: INestApplication) => {
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Adding basic Body validation to all endpoints, will respond with 400 Bad Request if the
  // Body type doesn't match the specified type on endpoint
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');
};

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const logger: Logger = new Logger('NestApplication');

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT_NUMBER');

  initApplication(app);

  await app.listen(port, () => {
    logger.log(`Application Is Running On Port: ${port}`);
  });
}
bootstrap();
