import item from 'App/Models/item'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(item, ({ faker }) => {
  return {
    tag: faker.random.numeric(5),
    reference: faker.word.noun(),
    category: faker.word.adjective(),
    description: faker.lorem.sentence(),
    quantity: parseInt(faker.random.numeric(3)),      
    location: faker.word.adjective(),    
    image: faker.image.technics(),
    datasheet: ""
  }
}).build()
