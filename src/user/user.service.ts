import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createAndSave(createUserInput: CreateUserInput): Promise<User> {
    return this.userRepository.createAndSave(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findAndUpdate(id: string, data?: UpdateUserInput): Promise<User> {
    const dbUser = await this.findById(id);
    return this.userRepository.findAndUpdate(dbUser, data);
  }

  async delete(id: string): Promise<boolean> {
    const dbUser = await this.findById(id);
    const deleted = await this.userRepository.deleteById(dbUser.id);
    if (deleted) {
      return true;
    }
    return false;
  }
}
