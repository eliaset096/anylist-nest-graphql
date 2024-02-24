import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { SignupInput } from '../auth/dtos/inputs/signup.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: await bcrypt.hash(signupInput.password, 10),
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      this.handleDBError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method findOne not implemented.');
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      this.logger.error(error);
      this.handleDBError(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('Method findOne not implemented.');
  }

  private handleDBError(error: any): never {
    if (error === '23505')
      throw new BadRequestException(error.detail.replace('Key ', ''));
    this.logger.error(error);
    throw new InternalServerErrorException('please try again later.');
  }
}
