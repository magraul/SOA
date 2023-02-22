import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './animal.model';
import { Model } from 'mongoose';
import { AnimalAddedEvent } from './animal-added.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @InjectModel(Animal.name)
    private readonly animalModel: Model<AnimalDocument>,
  ) {}

  async handleAnimalAdded(animalAddedEvent: AnimalAddedEvent) {
    const createdAnimal = await this.animalModel
      .create(
        new Animal(
          animalAddedEvent.name,
          animalAddedEvent.type,
          animalAddedEvent.age,
        ),
      )
      .then((animal) => animal);
    this.authClient.emit('created_animal', { animalId: createdAnimal._id });
  }

  async create(animal: Animal): Promise<Animal> {
    const createdAnimal = new this.animalModel(animal);
    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async findOne(id: string): Promise<Animal> {
    return this.animalModel.findById(id).exec();
  }

  async update(id: string, animal: Animal): Promise<Animal> {
    return this.animalModel.findByIdAndUpdate(id, animal, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.animalModel.findByIdAndRemove(id).exec();
  }
}
