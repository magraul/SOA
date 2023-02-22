import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('animal_added')
  handleAnimalAdded(data: any) {
    this.appService.handleAnimalAdded(data);
  }

  @MessagePattern('get_all_animals')
  getAllAnimals() {
    return this.appService.findAll();
  }
}
