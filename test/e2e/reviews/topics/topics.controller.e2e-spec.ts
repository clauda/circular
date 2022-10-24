import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { Model } from 'mongoose'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { agent as request } from 'supertest'

import { inMemoryDBConnect, inMemoryDBDisconnect } from '@test/database-setup'
import { TopicsModule } from '@/reviews/application/topics.module'
import { TopicEntity, TopicSchema } from '@/reviews/domain/topics/topic.schema'

describe('TopicsController (e2e)', () => {
  let app: INestApplication
  let inMemoryDBInstance
  let model: Model<TopicEntity>
  let server

  beforeAll(async () => {
    inMemoryDBInstance = await inMemoryDBConnect()
    model = inMemoryDBInstance.connection.model(TopicEntity.name, TopicSchema)

    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(inMemoryDBInstance.uri), TopicsModule],
      providers: [
        {
          provide: getModelToken(TopicEntity.name),
          useValue: model,
        },
      ],
    }).compile()

    app = module.createNestApplication()
    server = app.getHttpServer()

    await app.init()
  })

  describe('/reviews/topics (GET)', () => {
    beforeAll(async () => {
      await model.create({ title: 'Simplificar' })
    })

    it('should return all topics', async () => {
      const response = await request(server).get('/reviews/topics')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([
        { _id: expect.any(String), title: 'Simplificar' },
      ])
    })
  })

  afterAll(async () => {
    const { connection, instance } = inMemoryDBInstance
    await inMemoryDBDisconnect(connection, instance)
    server.close()
  })
})
