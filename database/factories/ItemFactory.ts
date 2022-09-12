import item from 'App/Models/item'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(item, ({ faker }) => {
  return {
    code: faker.random.numeric(5),
    name: faker.internet.userName(),
    category: faker.word.adjective(),
    description: faker.lorem.sentence(),
    quantity: parseInt(faker.random.numeric(5)),
    location: faker.word.adjective(),
    image: faker.image.technics()
  }
}).build()
