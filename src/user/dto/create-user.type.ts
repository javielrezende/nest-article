import { InputType, Field } from 'type-graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
