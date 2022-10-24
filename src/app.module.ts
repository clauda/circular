import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { ReviewsModule } from './reviews/reviews.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ReviewsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
