import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesType } from 'src/models/favoritesModels';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  //get favorites
  async getFavorites() {
    const favoritesResponse: FavoritesType = {
      artists: [],
      albums: [],
      tracks: [],
    };
    //add favorite albums to favorites object
    favoritesResponse.albums = await this.prisma.favAlbum
      .findMany({
        include: {
          album: true,
        },
      })
      .then((res) => res.map((album) => album.album));
    //add favorite tracks to favorites object
    favoritesResponse.tracks = await this.prisma.favTrack
      .findMany({
        include: {
          track: true,
        },
      })
      .then((res) => res.map((tracks) => tracks.track));
    //add favorite artists to favorites object
    favoritesResponse.artists = await this.prisma.favArtist
      .findMany({
        include: {
          artist: true,
        },
      })
      .then((res) => res.map((artists) => artists.artist));
    return favoritesResponse;
  }

  //add tracks to favorites
  async addTrack(tracksId: string) {
    const track = await this.prisma.track.findFirst({
      where: {
        id: tracksId,
      },
    });
    if (!track) {
      throw new HttpException(
        'Song id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favTrack.create({
      data: {
        trackId: tracksId,
      },
    });
    return 'Track added succesfully';
  }
  async deleteTrack(tracksId: string) {
    const trackInFavs = await this.prisma.favTrack.findFirst({
      where: {
        trackId: tracksId,
      },
    });
    if (!trackInFavs) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.favTrack.delete({
      where: {
        trackId: tracksId,
      },
    });
    return 'track deleted';
  }
  async addAlbum(albumsId: string) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: albumsId,
      },
    });
    if (!album) {
      throw new HttpException(
        'Album id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favAlbum.create({
      data: {
        albumId: album.id,
      },
    });
    return 'Album added to favorites';
  }
  async deleteAlbum(albumsId: string) {
    const albumInFavs = await this.prisma.favAlbum.findFirst({
      where: {
        albumId: albumsId,
      },
    });

    if (!albumInFavs) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.favAlbum.delete({
      where: {
        albumId: albumInFavs.albumId,
      },
    });
    return 'Album deleted';
  }
  async addArtist(artistsId: string) {
    const artist = await this.prisma.artist.findFirst({
      where: {
        id: artistsId,
      },
    });
    if (!artist) {
      throw new HttpException(
        'Artist id not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favArtist.create({
      data: {
        artistId: artist.id,
      },
    });
    return 'Artist added to favorites succesfully';
  }
  async deleteArtist(artistsId: string) {
    const artistInFavs = await this.prisma.favArtist.findFirst({
      where: {
        artistId: artistsId,
      },
    });
    if (!artistInFavs) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.prisma.favArtist.delete({
      where: {
        artistId: artistInFavs.artistId,
      },
    });
    return 'Artist deleted from favorites';
  }
}
