import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group';
import Loan from 'App/Models/Loan';
import User from 'App/Models/User';
import UserSelect from 'App/Models/UserSelect';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';
import UserValidator from 'App/Validators/UserValidator';
import userSelect from './userSelect';


export default class UsersController {

  //Views
  public async viewListGroup({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const users = await User
      .query()
      .where('group_id', params.group_id)
    const groups = await Group.all()
    return view.render('user/userList', { users: users, groups: groups, group_id: params.group_id, userS: userS })
  }

  public async viewCreate({ view }: HttpContextContract) {     
    let userS = await new userSelect().select()   

    const groups = await Group.all()
    return view.render('user/userCreate', { groups: groups, userS: userS })
  }

  public async viewEdit({ view, params }: HttpContextContract) { 
    let userS = await new userSelect().select()   

    const groups = await Group.all()
    const user = await User.find(params.id)
    return view.render('user/userUpdate', { user: user, groups: groups, userS: userS })
  }

  public async viewDelete({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const user = await User.find(params.id)
    return view.render('user/userDelete', { user: user, userS: userS })
  }

  //Api
  public async apiListId({ params }: HttpContextContract) {
    const user = await User.find(params.id)
    return user
  }

  public async apiStore({ request, response, session }: HttpContextContract) {
    // try {
    const payload = await request.validate(UserValidator);
    await User.create(payload);
    session.flash('success', 'El usuario se registró satisfactoriamente.')
    response.redirect('/user/group/' + payload.group_id)
    // } catch (error) {
    //   response.badRequest(error.messages)
    // }   

  }

  public async apiUpdate({ params, request, response, session }: HttpContextContract) {
    const payload = await request.validate(UserUpdateValidator);
    const user = await User.findOrFail(params.id)
    await user.merge(payload).save()
    session.flash('success', 'El usuario se actualizó satisfactoriamente.')
    response.redirect('/user/group/' + payload.group_id)
  }

  public async apiDelete({ view, request, response, params }: HttpContextContract) {
    let data = request.body();
    if (data.identification == data.confirm_identification) {
      const loans = await Loan
        .query()
        .where('user_id', params.id)
      if (loans.length > 0) {
        return view.render('shared/messages', { source: "userLoans", loans: loans })
      }
      else {
        const user = await User.findOrFail(params.id)
        await user.delete()
        response.redirect('/user/group/0')
      }
    }
    else {
      return view.render('shared/messages', { source: "userDelete", identification: data.identification })
    }
  }

  public async apiSelect({ params, response }: HttpContextContract) {
    await UserSelect.truncate();
    const user = await User.find(params.id)
    if (user) {
      let userselect = new UserSelect();
      userselect.user_id = user.id;
      await userselect.save();
    }
    response.redirect('/cart/list')
  }

}
