import { Module } from '@nestjs/common';
import { UserModule } from './Service/Users/users.module';
import { TracksModule } from './Service/Tracks/tracks.module';
import { ArtistModule } from './Service/Artist/artist.module';
import { AlbumsModule } from './Service/Albums/albums.module';

import { FavoritesModule } from './Service/Favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TracksModule,
    ArtistModule,
    AlbumsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
