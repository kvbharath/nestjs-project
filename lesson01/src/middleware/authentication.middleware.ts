// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//   private readonly logger = new Logger('AuthenticationMiddleware');

//   constructor(private readonly usersService: UsersService) {}
//   use(req: Request, res: Response, next: NextFunction) {
//     this.logger.log('Processing request in AuthenticationMiddleware');
//     next();
//   }
// }

import { NextFunction, Request, Response } from 'express';
import { BadRequestException, NestMiddleware } from '@nestjs/common';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['api-token'];
    if (!token) {
      throw new BadRequestException('The token is required');
    }
    if (token !== 'my-token') {
      throw new BadRequestException('The token does not match');
    }
    next();
  }
}
