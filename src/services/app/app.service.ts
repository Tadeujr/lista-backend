import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getLogin(x):string{
    return `${x} Logado!!!`;
  }
}
