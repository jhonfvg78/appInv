import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import User from 'App/Models/User'
import GroupValidator from 'App/Validators/GroupValidator'


export default class GroupsController {

    //Views
    public async viewList({ view }: HttpContextContract) {
        const groups = await Group.all()
        return view.render('group/groupList', { groups: groups })
    }

    public async viewEdit({ view, params }: HttpContextContract) {
        const group = await Group.find(params.id)
        return view.render('group/groupUpdate', { group: group })
    }

    public async viewDelete({ view, params }: HttpContextContract) {
        const group = await Group.find(params.id)
        return view.render('group/groupDelete', { group: group })
    }

    //Api
    public async apiListId({ params }: HttpContextContract) {
        const group = await Group.findOrFail(params.id)
        return group
    }

    public async apiStore({ request, response }: HttpContextContract) {
        let payload;
        try {
            payload = await request.validate(GroupValidator);
        } catch (error) {
            console.log(error.messages);
        }

        await Group.create(payload);
        response.redirect('/group/groups')
    }

    public async apiUpdate({ params, request, response }: HttpContextContract) {
        const payload = await request.validate(GroupValidator);
        const group = await Group.find(params.id)
        if (group) {
            const users = await User
                .query()
                .where('group', group.group)
            users.forEach(async user => {
                user.group = payload.group
                await user.merge(user.toJSON()).save()
            });
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
                    .where('group', group.group)
                users.forEach(async user => {
                    user.group = "NA"
                    await user.merge(user.toJSON()).save()
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
