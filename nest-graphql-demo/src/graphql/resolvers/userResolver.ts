import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/user';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { UserSetting } from '../models/userSetting';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { CreateUserInput } from '../utils/CreateUserInput';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }
  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }
  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }
  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const { username, displayName } = createUserData;
    const newUser = { username, displayName, id: ++incrementalId };
    mockUsers.push(newUser);
    return newUser;
  }
}
