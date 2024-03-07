import { Module } from '@nestjs/common';
import { UserModule } from './Service/Users/users.module';
import { TracksModule } from './Service/Tracks/tracks.module';
import { AlbumsController } from './Service/Albums/albums.controller';
import { ArtistModule } from './Service/Artist/artist.module';
import { AlbumsModule } from './Service/Albums/albums.module';
import { UserController } from './Service/Users/users.controller';
import { TracksController } from './Service/Tracks/tracks.controller';
import { ArtistController } from './Service/Artist/artist.controller';
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
