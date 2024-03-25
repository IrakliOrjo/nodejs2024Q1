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
import { CreateArtistDto } from 'src/models/artistModels';
import { ParamDto } from 'src/models/restModels';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  async getAllArtist() {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.artistService.getArtist(params.id);
  }
  @Post('/')
  @HttpCode(201)
  async createArtist(@Body() dto: CreateArtistDto) {
    return await this.artistService.createArtist(dto);
  }
  @Put(':id')
  async UpdateArtist(@Param() params: ParamDto, @Body() dto: CreateArtistDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.artistService.updateArtist(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.artistService.deleteArtist(params.id);
  }
}
