import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: 'Admin email', example: 'admin@bidkarlo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Admin password', example: 'Admin@123' })
  @IsString()
  @MinLength(6)
  password: string;
}




export class CreateCategoryDto {
  @ApiProperty({ example: 'Carpenter', description: 'Name of the vendor category' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Woodwork and furniture fixing services', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://cdn.bidkarlo.com/icons/carpenter.png', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;
  @ApiProperty({ example: 'categpry', description: 'Type of category', required: false })
  @IsOptional()
  @IsString()
  type: string;
}


export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: 'Updated category name', example: 'Carpenter Services' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Updated description', example: 'Wood and repair services' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Updated image URL', example: 'https://example.com/carpenter.jpg' })
  @IsOptional()
  @IsString()
  img_url?: string;
}

export class CreateCategoryFormDto {
  @ApiProperty({
    example: '6713b8a7d23a4a0012a4c789',
    description: 'Category ID this form belongs to',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: [
      { name: 'jobTitle', type: 'text', label: 'Job Title', required: true },
      { name: 'budget', type: 'number', label: 'Budget', required: false },
    ],
    description: 'Dynamic fields in the form',
  })
  @IsArray()
  @IsNotEmpty()
  fields: any[];

  @ApiProperty({ example: 'Carpenter Form', description: 'Form name' })
  @IsString()
  @IsNotEmpty()
  formName: string;

  @ApiProperty({
    example: 'Form for carpenter related jobs',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}