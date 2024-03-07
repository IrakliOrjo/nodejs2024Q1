import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Albums, Artists, Favorites, Tracks } from 'src/db/db';
import { ArtistType, CreateArtistDto } from 'src/models/artistModels';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class ArtistService {
  constructor() {}

  getArtists() {
    return Artists;
  }

  getArtist(id) {
    let artist = Artists.find((user) => user.id === id);
    if (artist) {
      return artist;
    } else {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
  createArtist(dto: CreateArtistDto) {
    let artist: ArtistType = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    Artists.push(artist);

    return artist;
  }

  updateArtist(id: string, dto: CreateArtistDto) {
    let artist = Artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }
  deleteArtist(id: string) {
    let foundArtist = Artists.find((artist) => artist.id === id);
    if (!foundArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    let indexOfArtist = Artists.indexOf(foundArtist);
    Albums.forEach((album) =>
      album.artistId === id ? (album.artistId = null) : '',
    );
    Tracks.forEach((track) =>
      track.artistId === id ? (track.artistId = null) : '',
    );
    let isInFavs = Favorites.artists.find((artist) => artist.id === id);
    if (isInFavs) {
      let indexOfArtistInFavs = Favorites.artists.indexOf(isInFavs);
      Favorites.artists.splice(indexOfArtistInFavs, 1);
    }
    Artists.splice(indexOfArtist, 1);
    return 'done';
  }
}
