import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsNumber()
  mobile: number;

  @IsNumber()
  bankAccountNumber: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  mobile: number;

  @IsNumber()
  @IsOptional()
  bankAccountNumber: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class FindOnePartnerParamDto {
  @IsNumberString()
  partnerId: string;
}
