import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request, Response } from 'express';
import { sendResponse } from 'src/utils/response.utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Res() res: Response, @Req() req: Request) {
    const localStrategyData = req.user;
    return sendResponse(res, localStrategyData, 'User Logged in Successfully');
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request, @Res() res: Response) {
    console.log('Inside AuthController status method');
    const jwtData = req.user;
    return sendResponse(res, jwtData, 'User Logged in Successfully');
  }
}
