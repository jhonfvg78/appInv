import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {
  public async index({ view }: HttpContextContract) {
    const items = await Item.all()
    return view.render('item/item', { items: items })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('item/itemAdd')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    response.redirect('/item')

  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
