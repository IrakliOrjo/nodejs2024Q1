import { AlbumType } from './albumModels';
import { ArtistType } from './artistModels';
import { TrackType } from './tracksModel';

export interface FavoritesType {
  artists: ArtistType[]; // favorite artists ids
  albums: AlbumType[]; // favorite albums ids
  tracks: TrackType[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: FavArtist[];
  albums: FavAlbum[];
  tracks: FavTrack[];
}

export interface FavAlbum {
  albumId: string;
}
export interface FavTrack {
  trackId: string;
}
export interface FavArtist {
  artistId: string;
}

interface Artist {
  name: string;
  grammy: boolean;
}
