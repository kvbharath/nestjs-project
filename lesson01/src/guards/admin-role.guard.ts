// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AdminRoleGuard implements CanActivate {
//   constructor(private userService: UsersService) {}

//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();

//     if (request?.user) {
//       const { id } = request.user;

//       try {
//         const user = await this.userService.findOne(id);

//         if (user && user.role === 'ADMIN') {
//           return true;
//         }
//       } catch (error) {
//         console.error('User not found or error occurred:', error);
//         throw new NotFoundException('User not found');
//       }
//     }

//     return false;
//   }
// }
