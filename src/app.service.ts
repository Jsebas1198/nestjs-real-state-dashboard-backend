import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    const taskCollection = this.database.collection('users');
    return taskCollection.find().toArray();
  }
}
