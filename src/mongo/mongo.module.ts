import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Module({
  providers: [MongoService, {
    provide: 'mongoinstance',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      let dbName = process.env.DATABASE_NAME ?? 'admin-bidkarlo';
      // let url =
      //   process.env.MONGODB_URI ?? 'mongodb://root:example@host.docker.internal:27017';
        let url =
        process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
      console.log(url); 
      const client = new MongoClient(url);
      const db = client.db(dbName)
      return db;
    }, 
  }], 
  imports: [ConfigModule],
  exports:[MongoService]
})
export class MongoModule { }
 