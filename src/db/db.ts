import { AlbumType } from 'src/models/albumModels';
import { ArtistType } from 'src/models/artistModels';
import { FavoritesType } from 'src/models/favoritesModels';
import { TrackType } from 'src/models/tracksModel';
import { User } from 'src/models/userModel';

export let Users: User[] = [];

export let Artists: ArtistType[] = [];

export let Albums: AlbumType[] = [];

export let Tracks: TrackType[] = [];

export let favoriteArtists: ArtistType[] = [];
export let favoriteAlbums: AlbumType[] = [];
export let favoriteTracks: TrackType[] = [];
export let Favorites: FavoritesType = {
  artists: [],
  albums: [],
  tracks: [],
};
