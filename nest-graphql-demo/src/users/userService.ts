import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { User } from 'src/graphql/models/user';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  getUsers() {
    return this.usersRepository.find({ relations: ['settings'] });
  }

  getUserById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  createUser(createUserData: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserData);
    return this.usersRepository.save(newUser);
  }
}
