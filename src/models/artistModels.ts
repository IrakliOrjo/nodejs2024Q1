import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export interface ArtistType {
  id: ReturnType<typeof uuidv4>; // uuid v4
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
