import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Model } from 'mongoose'

import { inMemoryDBConnect, inMemoryDBDisconnect } from '@test/database-setup'
import { TopicEntity, TopicSchema } from '@/reviews/domain/topics/topic.schema'
import { TopicsController } from './topics.controller'
import { Topic } from '@/reviews/domain/topics/contracts'

describe('TopicsController', () => {
  let sut: TopicsController
  let inMemoryDBInstance
  let model: Model<TopicEntity>

  beforeAll(async () => {
    inMemoryDBInstance = await inMemoryDBConnect()
    model = inMemoryDBInstance.connection.model(TopicEntity.name, TopicSchema)

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [
        {
          provide: getModelToken(TopicEntity.name),
          useValue: model,
        },
      ],
    }).compile()

    sut = module.get<TopicsController>(TopicsController)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('.create', () => {
    it('should create a new topic', async () => {
      const topic = await sut.create({ title: 'Some title' })

      expect(topic._id).toBeDefined()
      expect(topic.title).toBe('Some title')
    })
  })

  describe('.findAll', () => {
    it('should return all topics', async () => {
      const topics = await sut.findAll()

      expect(topics.length).toBe(1)
    })
  })

  describe('.findOne', () => {
    let topic

    beforeAll(async () => {
      topic = await sut.create({ title: 'Results' })
    })

    describe('when topic exists', () => {
      it('should return the given topic', async () => {
        const result = await sut.findOne(topic._id)

        expect(result.title).toBe('Results')
      })
    })

    describe('when topic do not exists', () => {
      it('should return null', async () => {
        const result = await sut.findOne('6355cb36b2959d22d6c7c595')

        expect(result).toBeNull()
      })
    })
  })

  describe('.update', () => {
    let topic: Topic

    beforeAll(async () => {
      topic = await sut.create({ title: 'Thrust' })
    })

    it('should call find an update model method', async () => {
      const updatedTopic = await sut.update(topic._id, {
        title: 'updated title',
      })

      expect(updatedTopic.title).toBe('updated title')
    })
  })

  afterEach(() => jest.clearAllMocks())

  afterAll(async () => {
    const { connection, instance } = inMemoryDBInstance
    await inMemoryDBDisconnect(connection, instance)
  })
})
