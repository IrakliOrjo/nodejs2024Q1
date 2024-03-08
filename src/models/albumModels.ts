import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;
  @ValidateIf((o) => typeof o.otherProperty === 'string' || null)
  @IsNotEmpty()
  @ApiProperty()
  artistId: string | null;
}
