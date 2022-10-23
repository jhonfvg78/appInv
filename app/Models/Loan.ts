import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Loan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idItem: number

  @column()
  public idUser: number

  @column()
  public reference: string

  @column()
  public quantity: number

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
