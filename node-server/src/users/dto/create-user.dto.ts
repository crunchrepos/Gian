import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  
  @ApiProperty({description: "User Email"})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description: "User Name"})
  @IsNotEmpty()
  @IsString()
  name: string;
  
}
