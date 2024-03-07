import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Albums,
  Artists,
  Favorites,
  Tracks,
  favoriteAlbums,
  favoriteArtists,
  favoriteTracks,
} from 'src/db/db';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor() {}
  getFavorites() {
    return Favorites;
    /* {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    }; */
  }
  addTrack(trackId: string) {
    let track = Tracks.find((song) => song.id === trackId);
    if (!track) {
      throw new HttpException(
        'Song id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    //favoriteTracks.push(track);
    Favorites.tracks.push(track);
  }
  deleteTrack(id: string) {
    let trackInFavs = Favorites.tracks.find((song) => song.id === id);
    if (!trackInFavs) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    let indexOfTrack = favoriteTracks.indexOf(trackInFavs);
    Favorites.tracks.splice(indexOfTrack, 1);
    return 'track deleted';
  }
  addAlbum(id: string) {
    let album = Albums.find((alb) => alb.id === id);
    if (!album) {
      throw new HttpException(
        'Album id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Favorites.albums.push(album);
  }
  deleteAlbum(id: string) {
    let albumInFavs = Favorites.albums.find((alb) => alb.id === id);
    console.log(albumInFavs, 'album in favs');
    if (!albumInFavs) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    let indexOfAlbums = favoriteAlbums.indexOf(albumInFavs);
    Favorites.albums.splice(indexOfAlbums, 1);
    return 'Album deleted';
  }
  addArtist(id: string) {
    let artist = Artists.find((art) => art.id === id);
    if (!artist) {
      throw new HttpException(
        'Artist id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Favorites.artists.push(artist);
  }
  deleteArtist(id: string) {
    let artistInFavs = Favorites.artists.find((art) => art.id === id);
    if (!artistInFavs) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    let indexOfArtist = favoriteArtists.indexOf(artistInFavs);
    Favorites.artists.splice(indexOfArtist, 1);
    return 'deleted';
  }
}
