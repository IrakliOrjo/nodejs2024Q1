import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as uuidValidate } from 'uuid';
import { ParamDto } from 'src/models/restModels';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Get('/')
  async getFavorites() {
    return await this.favoritesService.getFavorites();
  }
  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.addTrack(params.id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.deleteTrack(params.id);
  }
  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.addAlbum(params.id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.deleteAlbum(params.id);
  }
  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.addArtist(params.id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.favoritesService.deleteArtist(params.id);
  }
}
