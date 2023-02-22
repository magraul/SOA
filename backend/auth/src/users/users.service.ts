import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findAllFree(): Promise<UserDocument[]> {
    return this.userModel
      .find({ $or: [{ animalId: null }, { animalId: undefined }] })
      .exec();
  }

  async getRandomUser(): Promise<UserDocument> {
    return this.userModel.findOne({
      $or: [{ animalId: null }, { animalId: undefined }],
    });
  }

  async updateUser(user: UserDocument, data: any) {
    await this.userModel.updateOne(
      { _id: user._id },
      { $set: { animalId: data.animalId } },
    );
  }

  async resetUsersAnimals() {
    this.userModel.updateMany(
      {},
      { $set: { animalId: null } },
      function (err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log(res);
        }
      },
    );
  }

  async create(
    name: string,
    email: string,
    password?: string,
  ): Promise<UserDocument> {
    return this.userModel.create(new User(name, email, password || ''));
  }
}
