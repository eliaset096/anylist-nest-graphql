import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { CreateItemInput } from './create-item.input';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
