import group from 'App/Models/group'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(group, ({ faker }) => {
  return {
    group:faker.random.numeric(5),
    description: faker.lorem.words(6)
  }
}).build()
