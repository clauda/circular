import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TopicsController } from './topics/topics.controller'
import { TopicEntity, TopicSchema } from '../domain/topics/topic.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopicEntity.name, schema: TopicSchema },
    ]),
  ],
  controllers: [TopicsController],
  providers: [],
})
export class TopicsModule {}
