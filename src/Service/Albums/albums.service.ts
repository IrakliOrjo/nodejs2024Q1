import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/models/albumModels';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}
  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }
  async getAlbum(albumId: string) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: albumId,
      },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }
  async createAlbum(dto: CreateAlbumDto) {
    return await this.prisma.album.create({
      data: dto,
    });
  }

  async updateAlbum(albumId: string, dto: CreateAlbumDto) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: albumId,
      },
    });
    console.log('aulbum', album);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.album.update({
      where: {
        id: albumId,
      },
      data: dto,
    });
  }

  async deleteAlbum(albumId: string) {
    const foundAlbum = await this.prisma.album.findFirst({
      where: {
        id: albumId,
      },
    });
    if (!foundAlbum) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.album.delete({
      where: {
        id: albumId,
      },
    });
    return true;
  }
}
