import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {

  //Views
  public async viewListAll({ view }: HttpContextContract) {
    const items = await Item.all()
    return view.render('item/itemListAll', { items: items })
  }

  public async viewDetail({ params, view }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemDetail', { item: item })
  }

  public async viewCreate({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('item/itemCreate', { categories: categories })
  }   

  public async viewEdit({ view, params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemUpdate', { item: item })
  }  

  public async viewDelete({ view, params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemDelete', { item: item })
  }  

  //Api
  public async apiStore({ request, response }: HttpContextContract) {
    console.log(request.body());
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    response.redirect('/item')
  }

  public async apiUpdate({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator);
      await Item.query().where('id', params.id).update(payload)
      response.redirect('/item')
    } catch (error) {
      console.log(error);
    }
  }

  public async apiDelete({ response, params }: HttpContextContract) {
    await Item.query().where('id', params.id).delete()
    response.redirect('/item')
  }


}
