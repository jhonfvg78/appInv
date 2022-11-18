import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public identification: string = ""

  @column()
  public tag: string = ""

  @column()
  public name: string = ""

  @column()
  public lastname: string = ""

  @column()
  public email: string = ""

  @column()
  public phone: string = ""

  @column()
  public group: string = ""

  @column()
  public photo: string = ""

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime 

}
