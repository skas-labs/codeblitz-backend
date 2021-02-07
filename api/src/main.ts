import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Database } from './database/database.provider';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe())

  const swaggerOpts = new DocumentBuilder()
    .setTitle('CodeBlitz API')
    .setDescription(`
For Sample Authentication use \`105c840c-f4c8-4c6b-a8f8-f326d4012d63\`
    `)
    .setVersion('1.0')
    .addTag('codeblitz')
    .addBearerAuth({type: 'http', in: 'header', name: 'Authorization'})
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOpts);
  SwaggerModule.setup('docs', app, document);

  await app.get(Database).connectDb();
  await app.listen(3131);
}

bootstrap();