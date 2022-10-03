import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Category, ({ faker }) => {
  return {
    name:faker.word.adjective(),
    description:faker.lorem.words(3),
    quantity: parseInt(faker.random.numeric(5)),
    image: faker.image.technics()

  }
}).build()
