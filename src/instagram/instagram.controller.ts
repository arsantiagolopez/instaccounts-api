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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({ description: 'Instagram was successfully added.' })
  @ApiBadRequestResponse({ description: 'Instagram account already exists.' })
  async addOne(
    @Body() addInstagramDto: AddInstagramDto,
    @Req() req: RequestWithUserId,
  ): Promise<PublicInstagram> {
    return this.instagramService.addOne(addInstagramDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'All instagrams fetched.' })
  async findAll(@Req() req: RequestWithUserId): Promise<PublicInstagram[]> {
    return this.instagramService.findAll(req);
  }

  @Put('active/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Instagram was successfully updated.' })
  @ApiBadRequestResponse({ description: "Instagram account doesn't exist." })
  async updateActive(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
  ): Promise<PublicInstagram> {
    return this.instagramService.updateActive(id, req);
  }

  @Post()
  @UseGuards(AuthGuard)
  async authorize(
    @Body() addInstagramDto: AddInstagramDto,
    @Req() req: RequestWithUserId,
  ) {
    return this.instagramService.authorize(addInstagramDto, req);
  }
}
