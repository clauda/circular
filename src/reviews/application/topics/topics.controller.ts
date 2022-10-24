import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Topic, UpsertTopicDTO } from '../../domain/topics/contracts'
import { TopicEntity } from '../../domain/topics/topic.schema'

@Controller('/reviews/topics')
export class TopicsController {
  constructor(
    @InjectModel(TopicEntity.name)
    private model: Model<Topic>,
  ) {}

  @Post()
  create(@Body() params: UpsertTopicDTO): Promise<Topic> {
    return this.model.create(params)
  }

  @Get()
  findAll(): Promise<Topic[]> {
    return this.model.find().exec()
  }

  @Get(':id')
  findOne(@Param('id') id: string | ObjectId): Promise<Topic> {
    return this.model.findById(id).exec()
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() params: UpsertTopicDTO,
  ): Promise<Topic> {
    await this.model.findByIdAndUpdate(id, params).exec()

    return this.model.findById(id).exec()
  }
}
