import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { sign } from 'jsonwebtoken';
import { UserDocument } from './users/users.model';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  private readonly ACCESS_SECRET: string = '95EA4B6834B835F2';

  async handleAnimalAdded(data: any) {
    const users = await this.usersService.findAllFree();
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    this.usersService.updateUser(randomUser, data);
  }

  getRandomUser() {
    return this.usersService.getRandomUser();
  }

  getAllUsers() {
    return this.usersService.findAll();
  }

  handleUserAdded(data: any) {
    this.usersService.create(data.name, data.email);
  }

  resetUsersAnimals(data: any) {
    this.usersService.resetUsersAnimals();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | undefined> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return undefined;
    }

    if (user.password !== password) {
      return undefined;
    }

    return this.generateToken(user);
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | undefined> {
    const user = await this.usersService.create(name, email, password);
    return this.generateToken(user);
  }

  private async generateToken(
    user: UserDocument,
  ): Promise<{ accessToken: string } | undefined> {
    return {
      accessToken: sign({ userId: user._id }, this.ACCESS_SECRET, {
        expiresIn: '10h',
      }),
    };
  }
}
