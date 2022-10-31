import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.create({
      id:"1234567890",
      name:"admin",
      lastname:"admin",
      email:"admin@admin.com",
      group:"admin",
      role:"admin",
      password:"admin"
    })
  }
}
