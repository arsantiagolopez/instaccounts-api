import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/auth/entities';
import { Instagram } from './entities';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Instagram])],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
