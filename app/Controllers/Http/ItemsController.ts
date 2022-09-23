import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {
  public async index({ view }: HttpContextContract) {
    const items = await Item.all()
    return view.render('item/itemIndex', { items: items })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('item/itemCreate', { mode: "create" })
  }

  public async store({ request, response }: HttpContextContract) {
    console.log(request.body());
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    response.redirect('/item')
  }

  public async show({ params, view }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemDelete', { item: item })
  }

  public async edit({ view, params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemUpdate', { item: item })
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator);
      await Item.query().where('id', params.id).update(payload)
      response.redirect('/item')
    } catch (error) {
      console.log(error);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    await Item.query().where('id', params.id).delete()
    response.redirect('/item')
  }
}
