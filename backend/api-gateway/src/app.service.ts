import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MyGateway } from './gateway/gateway';
import { LoginDto } from './login.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('ANIMALS_SERVICE') private readonly animalsClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly gateway: MyGateway,
  ) {}

  addNewAnimal({ name, age, type }) {
    this.animalsClient.emit('animal_added', { name, age, type });
    this.gateway.increaseAnimals();
  }

  addNewUser({ name, email }) {
    this.authClient.emit('user_added', { name, email });
    this.gateway.increaseUsers();
  }

  async findAllAnimals() {
    const animals = await lastValueFrom(
      this.animalsClient.send('get_all_animals', {}),
    );
    return animals;
  }

  async findAllUsers() {
    const users = await lastValueFrom(
      this.authClient.send('get_all_users', {}),
    );
    return users;
  }

  async login(loginData: LoginDto) {
    const token = await lastValueFrom(
      this.authClient.send('login', { ...loginData }),
    );
    return token;
  }

  async signup(signupData: any) {
    const token = await lastValueFrom(
      this.authClient.send('signup', { ...signupData }),
    );
    return token;
  }

  resetUsersAnimals() {
    this.authClient.emit('reset_users_animals', {});
  }
}
