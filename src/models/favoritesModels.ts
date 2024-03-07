import { AlbumType } from './albumModels';
import { ArtistType } from './artistModels';
import { TrackType } from './tracksModel';

export interface FavoritesType {
  artists: ArtistType[]; // favorite artists ids
  albums: AlbumType[]; // favorite albums ids
  tracks: TrackType[]; // favorite tracks ids
}

interface FavoritesResponse {
  artists: ArtistType[];
  albums: AlbumType[];
  tracks: TrackType[];
}

interface Artist {
  name: string;
  grammy: boolean;
}

/* interface Artist {
  name: string;
  grammy: boolean;
}

interface Albums {
  name: string;
  year: number;
  artistId: string | null;
}

interface Track {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
 */
