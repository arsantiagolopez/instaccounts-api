import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards';
import { RequestWithUserId } from 'src/common/interfaces';
import { PublicInstagram } from 'src/common/interfaces/instagram';
import { AddInstagramDto } from './dto/add-instagram.dto';
import { InstagramService } from './instagram.service';

@Controller('instagrams')
@ApiTags('Instagrams')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addOne(
    @Body() addInstagramDto: AddInstagramDto,
    @Req() req: RequestWithUserId,
  ): Promise<PublicInstagram> {
    return this.instagramService.addOne(addInstagramDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: RequestWithUserId): Promise<PublicInstagram[]> {
    return this.instagramService.findAll(req);
  }

  @Put('active/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateActive(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
  ): Promise<PublicInstagram> {
    return this.instagramService.updateActive(id, req);
  }
}
