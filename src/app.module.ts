import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from './mongo/mongo.module';

@Module({
   imports: [
    JwtModule.register({
    secret: process.env.JWT_SECRET || 'hellosir',
    signOptions: { expiresIn: '24h' },
  }),
  MongoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
