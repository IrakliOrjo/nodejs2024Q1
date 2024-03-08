import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorites, Tracks } from 'src/db/db';
import { CreateTrackDto, TrackType } from 'src/models/tracksModel';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class TracksService {
  getAllTracks() {
    return Tracks;
  }
  getTrack(id: string) {
    const track = Tracks.find((song) => song.id === id);
    if (!track) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }
  createTrack(dto: CreateTrackDto) {
    const track: TrackType = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    Tracks.push(track);
    return track;
  }

  updateTrack(trackId: string, dto: CreateTrackDto) {
    const track = Tracks.find((song) => song.id === trackId);

    if (!track) {
      throw new NotFoundException('album not found');
    }
    track.name = dto.name;
    track.artistId = dto.artistId;
    track.albumId = dto.albumId;
    track.duration = dto.duration;

    return track;
  }

  deleteTrack(trackId: string) {
    const foundTrack = Tracks.find((song) => song.id === trackId);
    if (!foundTrack) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    const indexOfTrack = Tracks.indexOf(foundTrack);
    const isInFavs = Favorites.tracks.find((track) => track.id === trackId);
    if (isInFavs) {
      const indexOfTrackInFavs = Favorites.tracks.indexOf(isInFavs);
      Favorites.tracks.splice(indexOfTrackInFavs, 1);
    }
    Tracks.splice(indexOfTrack, 1);
    return 'done';
  }
}
