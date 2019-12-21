import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.type';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(returns => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createAndSave(data);
  }

  @Query(returns => [User])
  async allUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(returns => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data?: UpdateUserInput,
  ): Promise<User> {
    return this.userService.findAndUpdate(id, data);
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
