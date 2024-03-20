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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from 'src/models/tracksModel';
import { validate as uuidValidate } from 'uuid';
import { ParamDto } from 'src/models/restModels';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get('/')
  async getAllTracks() {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.tracksService.getTrack(params.id);
  }
  @Post('/')
  @HttpCode(201)
  async createTrack(@Body() dto: CreateTrackDto) {
    return await this.tracksService.createTrack(dto);
  }
  @Put(':id')
  async updateTrack(@Param() params: ParamDto, @Body() dto: CreateTrackDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.tracksService.updateTrack(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return await this.tracksService.deleteTrack(params.id);
  }
}
