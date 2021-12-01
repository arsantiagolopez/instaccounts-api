import { PartialType } from '@nestjs/swagger';
import { AddInstagramDto } from './add-instagram.dto';

export class UpdateInstagramDto extends PartialType(AddInstagramDto) {}
