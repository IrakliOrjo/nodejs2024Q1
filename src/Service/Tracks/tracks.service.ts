import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto, TrackType } from 'src/models/tracksModel';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
  async getAllTracks() {
    return await this.prisma.track.findMany();
  }
  async getTrack(trackId: string) {
    const track = await this.prisma.track.findFirst({
      where: {
        id: trackId,
      },
    });
    if (!track) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }
  async createTrack(dto: CreateTrackDto) {
    return await this.prisma.track.create({
      data: dto,
    });
  }

  async updateTrack(trackId: string, dto: CreateTrackDto) {
    const track = await this.prisma.track.findFirst({
      where: {
        id: trackId,
      },
    });

    if (!track) {
      throw new NotFoundException('album not found');
    }
    await this.prisma.track.update({
      where: {
        id: trackId,
      },
      data: dto,
    });

    return track;
  }

  async deleteTrack(trackId: string) {
    const foundTrack = await this.prisma.track.findFirst({
      where: {
        id: trackId,
      },
    });
    if (!foundTrack) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.delete({
      where: {
        id: trackId,
      },
    });
    return true;
  }
}
