import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // JWT setup
  await app.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'hellosir',
    sign: { expiresIn: '24h' },
  });

  // Set global prefix for your API routes
  app.setGlobalPrefix('webapi-bidkarlo');

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Enable CORS
  await app.register(require('@fastify/cors'), {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('WEB-API')
    .setDescription('API for BIDKARLO-WEBAPI application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 🟢 Important: use a DIFFERENT path from the global prefix
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customfavIcon: '/favicon.ico',
    customSiteTitle: 'BIDKARLO API Documentation',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Application running at: http://localhost:${port}/webapi-bidkarlo`);
  console.log(`📘 Swagger docs available at: http://localhost:${port}/webapi-bidkarlo/docs`);
}

bootstrap();
