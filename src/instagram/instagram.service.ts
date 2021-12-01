import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { RequestWithUserId } from 'src/common/interfaces';
import { PublicInstagram } from 'src/common/interfaces/instagram';
import { Repository } from 'typeorm';
import { AddInstagramDto } from './dto/add-instagram.dto';
import { Instagram } from './entities';

@Injectable()
export class InstagramService {
  constructor(
    @InjectRepository(Instagram)
    private instagramRepository: Repository<Instagram>,
  ) {}

  async addOne(
    addInstagramDto: AddInstagramDto,
    { userId }: RequestWithUserId,
  ): Promise<PublicInstagram> {
    let { username, password } = addInstagramDto;
    username = username.toLowerCase();

    const instagramExists = await this.instagramRepository.findOne({
      username,
    });

    if (instagramExists) {
      throw new HttpException(
        'Instagram account already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash password
    password = await argon2.hash(password);

    const instagram = this.instagramRepository.create({
      ...addInstagramDto,
      username,
      password,
      userId,
      lastActive: new Date(),
    });
    const { password: _, ...publicProfile } =
      await this.instagramRepository.save(instagram);

    return publicProfile;
  }

  async findAll({ userId }: RequestWithUserId): Promise<PublicInstagram[]> {
    const instagrams = await this.instagramRepository.find({ userId });

    // Return in order of creation (newest last)
    instagrams.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return instagrams;
  }

  async updateActive(
    id: string,
    { userId }: RequestWithUserId,
  ): Promise<PublicInstagram> {
    const instagram = await this.instagramRepository.findOne({
      id,
      userId,
    });

    if (!instagram) {
      throw new HttpException(
        "Instagram account doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }

    instagram.lastActive = new Date();
    return await this.instagramRepository.save(instagram);
  }
}
