import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { validate as uuidValidate } from 'uuid';
import { ArtistType, CreateArtistDto } from 'src/models/artistModels';
import { ParamDto } from 'src/models/restModels';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  getAllArtist() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.artistService.getArtist(params.id);
  }
  @Post('/')
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }
  @Put(':id')
  UpdateArtist(@Param() params: ParamDto, @Body() dto: CreateArtistDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.artistService.updateArtist(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.artistService.deleteArtist(params.id);
  }
}
