import { IsNumber, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TelegramFromDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsString()
  last_name?: string;

  @IsString()
  language_code?: string;
}

export class TelegramChatDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsString()
  last_name?: string;

  @IsString()
  type: string;
}

export class TelegramMessageContentDto {
  @IsNumber()
  message_id: number;

  @ValidateNested()
  @Type(() => TelegramFromDto)
  from: TelegramFromDto;

  @ValidateNested()
  @Type(() => TelegramChatDto)
  chat: TelegramChatDto;

  @IsNumber()
  date: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class TelegramPayloadDto {
  @IsNumber()
  update_id: number;

  @ValidateNested()
  @Type(() => TelegramMessageContentDto)
  message: TelegramMessageContentDto;
}