import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);

  console.log(`listening on port${port}`);
}
bootstrap();
