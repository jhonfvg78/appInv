import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tag: string

  @column()
  public reference: string

  @column()
  public category: string

  @column()
  public description: string

  @column()
  public quantity: number

  @column()
  public location: string

  @column()
  public maintenance: boolean

  @column()
  public image: string

  @column()
  public datasheet: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
