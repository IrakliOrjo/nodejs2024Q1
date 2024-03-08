import { AlbumType } from 'src/models/albumModels';
import { ArtistType } from 'src/models/artistModels';
import { FavoritesType } from 'src/models/favoritesModels';
import { TrackType } from 'src/models/tracksModel';
import { User } from 'src/models/userModel';

export const Users: User[] = [];

export const Artists: ArtistType[] = [];

export const Albums: AlbumType[] = [];

export const Tracks: TrackType[] = [];

export const favoriteArtists: ArtistType[] = [];
export const favoriteAlbums: AlbumType[] = [];
export const favoriteTracks: TrackType[] = [];
export const Favorites: FavoritesType = {
  artists: [],
  albums: [],
  tracks: [],
};
