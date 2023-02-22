import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  age: number;

  @Prop()
  userId?: string;

  constructor(name: string, type: string, age: number) {
    this.age = age;
    this.type = type;
    this.name = name;
  }
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
