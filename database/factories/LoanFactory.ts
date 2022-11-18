import loan from 'App/Models/loan'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export default Factory.define(loan, ({ faker }) => {
  return {    
    admission: DateTime.local(2022, 10, Math.floor(Math.random() * (30 - 12) ) + 12),
    user_id:1,
    item_id:1,
    reference:faker.random.word(),
    quantity: parseInt(faker.random.numeric(1)),
    image:faker.internet.avatar()
  }
}).build()
