import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Albums, Favorites, Tracks } from 'src/db/db';
import { AlbumType, CreateAlbumDto } from 'src/models/albumModels';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class AlbumsService {
  getAllAlbums() {
    return Albums;
  }
  getAlbum(id: string) {
    const album = Albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }
  createAlbum(dto: CreateAlbumDto) {
    const album: AlbumType = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    Albums.push(album);
    return album;
  }

  updateAlbum(albumId: string, dto: CreateAlbumDto) {
    const album = Albums.find((album) => album.id === albumId);

    if (!album) {
      throw new NotFoundException('album not found');
    }
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;

    return album;
  }

  deleteAlbum(albumId: string) {
    const foundAlbum = Albums.find((album) => album.id === albumId);
    if (!foundAlbum) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    const indexOfAlbum = Albums.indexOf(foundAlbum);
    Tracks.forEach((track) =>
      track.albumId === albumId ? (track.albumId = null) : '',
    );
    const isInFavs = Favorites.albums.find((album) => album.id === albumId);
    if (isInFavs) {
      const indexOfAlbumInFavs = Favorites.albums.indexOf(isInFavs);
      Favorites.albums.splice(indexOfAlbumInFavs, 1);
    }
    Albums.splice(indexOfAlbum, 1);
    return 'done';
  }
}
