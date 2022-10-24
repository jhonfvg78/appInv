import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async viewList({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('user/userList', { users: users })
  }
}
