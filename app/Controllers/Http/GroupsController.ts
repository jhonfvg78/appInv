import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import User from 'App/Models/User'
import GroupValidator from 'App/Validators/GroupValidator'
import userSelect from './userSelect'


export default class GroupsController {

    //Views
    public async viewList({ view }: HttpContextContract) {
        let userS = await new userSelect().select()
        const groups = await Group.all()
        return view.render('group/groupList', { groups: groups, userS: userS })
    }

    public async viewEdit({ view, params }: HttpContextContract) {
        let userS = await new userSelect().select()
        const group = await Group.find(params.id)
        return view.render('group/groupUpdate', { group: group, userS: userS })
    }

    public async viewDelete({ view, params }: HttpContextContract) {
        let userS = await new userSelect().select()
        const group = await Group.find(params.id)
        return view.render('group/groupDelete', { group: group, userS: userS })
    }

    //Api
    public async apiListId({ params }: HttpContextContract) {
        const group = await Group.findOrFail(params.id)
        return group
    }

    public async apiStore({ request, response }: HttpContextContract) {
        const payload = await request.validate(GroupValidator);
        await Group.create(payload);
        response.redirect('/group/groups')
    }

    public async apiUpdate({ params, request, response }: HttpContextContract) {
        const payload = await request.validate(GroupValidator);
        const group = await Group.find(params.id)
        if (group) {
            await group.merge(payload).save()
            response.redirect('/group/groups')
        }
    }

    public async apiDelete({ view, request, response, params }: HttpContextContract) {
        let data = request.body();
        if (data.group == data.confirm_group) {
            const group = await Group.find(params.id)
            if (group) {
                const users = await User
                    .query()
                    .where('group_id', group.id)
                users.forEach(async user => {
                    user.group_id = 0
                    await user.save()
                });
                await group.delete()
                response.redirect('/group/groups')
            }
        }
        else {
            return view.render('shared/messages', { source: "groupDelete", group: data.group })
        }
    }

}
