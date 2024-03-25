import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/models/artistModels';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async getArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtist(artistId: string) {
    const artist = await this.prisma.artist.findFirst({
      where: {
        id: artistId,
      },
    });
    if (artist) {
      return artist;
    } else {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
  async createArtist(dto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: dto,
    });
  }

  async updateArtist(artistId: string, dto: CreateArtistDto) {
    const artist = await this.prisma.artist.findFirst({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    return await this.prisma.artist.update({
      where: {
        id: artistId,
      },
      data: dto,
    });
  }
  async deleteArtist(artistId: string) {
    const foundArtist = await this.prisma.artist.findFirst({
      where: {
        id: artistId,
      },
    });
    if (!foundArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.artist.delete({
      where: {
        id: artistId,
      },
    });
    return true;
  }
}
