import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
  
  @ApiProperty({description: "Shopify Product ID"})
  @IsString()
  @IsNotEmpty()
  productId: string

  @ApiProperty({description: "Shopify Product Handle"})
  @IsString()
  @IsNotEmpty()
  handle: string;

  @ApiProperty({description: "Shopify Product Name"})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({description: "Product URL"})
  @IsString()
  @IsNotEmpty()
  img_url: string;

  @ApiProperty({description: "User Email Who Favorited"})
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;
}
