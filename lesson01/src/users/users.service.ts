import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): Promise<User[]> {
    return this.userRepository.findAll(role);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    console.log('create', createUserDto);

    return this.userRepository.create(createUserDto);
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  delete(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
}
