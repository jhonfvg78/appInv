import { DateTime } from 'luxon'
import { column, BaseModel , beforeSave} from '@ioc:Adonis/Lucid/Orm'

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
  public photo: string = ""

  @column()
  public group_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime 

  @beforeSave()
  public static async beforeItem(user: User) {
    try {      
      user.tag = user.tag.toUpperCase();
    } catch (error) {

    }
  }

}
