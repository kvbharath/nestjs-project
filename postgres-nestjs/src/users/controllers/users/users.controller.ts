import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/createUserPofile.dto';
import { CreateUSerPostDto } from 'src/users/dtos/createUserPost.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userDetails = await this.userService.createUser(createUserDto);
    return userDetails;
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Update user logic here
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUSerPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUSerPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
