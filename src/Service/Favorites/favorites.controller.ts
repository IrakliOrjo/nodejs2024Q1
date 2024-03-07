import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as uuidValidate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Get('/')
  getFavorites() {
    return this.favoritesService.getFavorites();
  }
  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.addTrack(params.id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.deleteTrack(params.id);
  }
  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.addAlbum(params.id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.deleteAlbum(params.id);
  }
  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.addArtist(params.id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param() params: any) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.favoritesService.deleteArtist(params.id);
  }
}
