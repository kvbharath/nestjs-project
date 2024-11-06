import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { sendResponse } from 'src/utils/response.utils';

@Controller('users')
// @UseGuards(AdminRoleGuard)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users OR /users?role=value
  async findAll(
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
    @Res() res?: Response,
  ) {
    try {
      const users = await this.usersService.findAll(role);

      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }

      return sendResponse(res, users, 'Users fetched successfully');
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @Get(':id') // GET /users/:id
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return sendResponse(res, user, 'User fetched successfully');
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @Post() // POST /users
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      return sendResponse(res, user, 'User created successfully');
    } catch (error) {
      if (
        error.message.includes(
          'duplicate key value violates unique constraint',
        ) ||
        error.message.includes('Email already exists')
      ) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Patch(':id') // PATCH /users/:id
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: 'User not found or could not be updated' });
      }

      return sendResponse(res, updatedUser, 'User updated successfully');
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @Delete(':id') // DELETE /users/:id
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.delete(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res
        .status(200)
        .json({ message: 'User deleted successfully', user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }
}
