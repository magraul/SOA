import {
  Body,
  Controller,
  Get,
  Post,
  Inject,
  OnModuleInit,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './login.dto';
import { WeatherService } from './weather.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    private readonly weatherService: WeatherService,
    @Inject('ANIMALS_SERVICE') private readonly animalsClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.animalsClient.subscribeToResponseOf('get_all_animals');
    this.authClient.subscribeToResponseOf('login');
    this.authClient.subscribeToResponseOf('signup');
    this.authClient.subscribeToResponseOf('get_all_users');
    await this.authClient.connect();
    await this.animalsClient.connect();
  }

  @UseGuards(JwtAuthGuard)
  @Get('animals')
  findAllAnimals() {
    return this.appService.findAllAnimals();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAllUsers() {
    return this.appService.findAllUsers();
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.appService.login(body);
  }

  @Post('signup')
  async signup(@Body() body: any) {
    return this.appService.signup(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add_user')
  async addUser(@Body() body: any) {
    this.appService.addNewUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add_animal')
  async addAnimal(@Body() body: any) {
    this.appService.addNewAnimal(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset_animals')
  async resetAnimals(@Body() body: any) {
    this.appService.resetUsersAnimals();
  }

  @UseGuards(JwtAuthGuard)
  @Get('weather/:city')
  async getWeather(@Param('city') city: string): Promise<any> {
    return this.weatherService.getWeather(city);
  }
}
