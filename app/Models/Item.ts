import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tag: string = ""

  @column()
  public reference: string = ""  

  @column()
  public quantity: number

  @column()
  public available: number

  @column()
  public location: string = ""

  @column()
  public status: string = ""

  @column()
  public image: string = ""

  @column()
  public resource: string = ""

  @column()
  public admission: string = ""

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async beforeItem(item: Item) {
    try {
      item.available = item.quantity;
      item.tag = item.tag.toUpperCase();
    } catch (error) {

    }
  }
}
