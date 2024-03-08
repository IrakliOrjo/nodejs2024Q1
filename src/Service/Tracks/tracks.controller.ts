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
  getAllTracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.getTrack(params.id);
  }
  @Post('/')
  @HttpCode(201)
  createTrack(@Body() dto: CreateTrackDto) {
    return this.tracksService.createTrack(dto);
  }
  @Put(':id')
  UpdateTrack(@Param() params: ParamDto, @Body() dto: CreateTrackDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.updateTrack(params.id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() params: ParamDto) {
    if (!uuidValidate(params.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.deleteTrack(params.id);
  }
}
