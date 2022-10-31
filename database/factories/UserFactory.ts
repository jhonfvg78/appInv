import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    name:faker.internet.userName(),
    lastname:faker.internet.userName(),    
    email:faker.internet.email(),
    group:"123456",
    photo:faker.internet.avatar(),
    role:"user"    
  }
}).build()
