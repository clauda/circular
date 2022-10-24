import { Module } from '@nestjs/common'
import { TopicsModule } from './application/topics.module'

@Module({
  imports: [TopicsModule],
  controllers: [],
  providers: [],
})
export class ReviewsModule {}
