import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {
  public async index({ view }: HttpContextContract) {
    const items = await Item.all()
    return view.render('item/itemIndex', { items: items })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('item/itemCreate')
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      console.log(request.body());
      const payload = await request.validate(ItemValidator);
      await Item.create(payload);
      response.redirect('/itemIndex')
    } catch (error) {
      console.log(error.messages);
    }
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async delete({ view, params }: HttpContextContract) {

  
    const item = await Item.find(params.id)
    console.log(item);
    return view.render('item/itemDelete', { item: item })
  }

  public async destroy({ }: HttpContextContract) { }
}
