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
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.albumService.getAlbum(params.id);
  }
  @Post('/')
  @HttpCode(201)
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }
  @Put(':id')
  UpdateAlbum(@Param() params: ParamDto, @Body() dto: CreateAlbumDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.albumService.updateAlbum(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.albumService.deleteAlbum(params.id);
  }
}
