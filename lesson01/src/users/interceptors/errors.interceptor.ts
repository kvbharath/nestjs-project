// import {
//   CallHandler,
//   ExecutionContext,
//   HttpException,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable()
// export class UserErrorInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> | Promise<Observable<any>> {
//     return nextinterceptors/errors.interceptor
//       .handle()
//       .pipe(
//         catchError((err) =>
//           throwError(() => new HttpException('Intercepted response', 500)),
//         ),
//       );
//   }
// }
