import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { isNull } from 'util';
import { v4 as uuidv4 } from 'uuid';

export interface AlbumType {
  id: ReturnType<typeof uuidv4>; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @ValidateIf((o) => typeof o.otherProperty === 'string' || null)
  @IsNotEmpty()
  artistId: string | null;
}
