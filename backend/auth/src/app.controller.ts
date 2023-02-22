import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login')
  login(data: any) {
    return this.appService.login(data.email, data.password);
  }

  @MessagePattern('signup')
  signup(data: any) {
    return this.appService.signUp(data.name, data.email, data.password);
  }

  @MessagePattern('get_all_users')
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @EventPattern('user_added')
  handleUserAdded(data: any) {
    this.appService.handleUserAdded(data);
  }

  @EventPattern('created_animal')
  handleAnimalCreated(data: any) {
    this.appService.handleAnimalAdded(data);
  }

  @EventPattern('reset_users_animals')
  handleResetAnimals(data: any) {
    this.appService.resetUsersAnimals(data);
  }
}
