import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.type';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.save(this.create(createUserInput));
    return await this.findById(user.id);
  }

  async findAll(): Promise<User[]> {
    return this.find();
  }

  async findById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async findAndUpdate(dbUser: User, data: UpdateUserInput): Promise<User> {
    await this.update(dbUser.id, { ...data });
    const updatedUser = this.create({ ...dbUser, ...data });
    return updatedUser;
  }

  async deleteById(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}
