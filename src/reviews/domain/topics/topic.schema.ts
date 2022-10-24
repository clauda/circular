import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Topic } from './contracts'

export type TopicDocument = TopicEntity & Document

@Schema({ versionKey: false })
export class TopicEntity implements Topic {
  @Prop({ required: true })
  title: string
}

export const TopicSchema = SchemaFactory.createForClass(TopicEntity)
