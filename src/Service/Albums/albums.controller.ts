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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from 'src/models/albumModels';
import { validate as uuidValidate } from 'uuid';
import { ParamDto } from 'src/models/restModels';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get('/')
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.albumService.getAlbum(params.id);
  }
  @Post('/')
  @HttpCode(201)
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.albumService.createAlbum(dto);
  }
  @Put(':id')
  async updateAlbum(@Param() params: ParamDto, @Body() dto: CreateAlbumDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.albumService.updateAlbum(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.albumService.deleteAlbum(params.id);
  }
}
