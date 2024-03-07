import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export interface TrackType {
  id: ReturnType<typeof uuidv4>; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateIf((o) => typeof o.otherProperty === 'string' || null)
  @IsNotEmpty()
  artistId: string | null;
  @ValidateIf((o) => typeof o.otherProperty === 'string' || null)
  @IsNotEmpty()
  albumId: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
