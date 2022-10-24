import { IsString } from 'class-validator'

export class UpsertTopicDTO {
  @IsString()
  title: string
}
