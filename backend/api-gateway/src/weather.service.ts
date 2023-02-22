import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  API_KEY = '277e99ffa2c84c9d93e151906231602';

  async getWeather(city: string): Promise<any> {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${city}`,
    );
    return response.data;
  }
}
