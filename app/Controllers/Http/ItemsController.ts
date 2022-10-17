import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cart from 'App/Models/Cart'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {

  //Views
  public async viewTag({ view, params }: HttpContextContract) {
    const items = await Item
      .query()
      .where('tag', params.tag)
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  }

  public async viewReference({ view, params }: HttpContextContract) {
    const items = await Item
      .query()
      .where('reference', 'LIKE', '%' + params.reference + '%')
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  }

  public async viewList({ view, params }: HttpContextContract) {
    const carts = await Cart.all()
    let totalItems: number = 0
    carts.forEach(cart => {
      totalItems += cart.quantity
    });
    const items = await Item
      .query()
      .where('category', params.category)
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: params.category, totalItems: totalItems })
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
    const categories = await Category.all()
    const item = await Item.find(params.id)
    return view.render('item/itemUpdate', { item: item, categories: categories })
  }

  public async viewDelete({ view, params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return view.render('item/itemDelete', { item: item })
  }

  //Api
  public async apiStore({ request, response }: HttpContextContract) {
    const payload = await request.validate(ItemValidator);
    const newItem = {
      ...payload,
      available: payload.quantity
    }
    await Item.create(newItem);
    response.redirect('/item/list/Ninguna')
  }

  public async apiUpdate({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator);
      await Item.query().where('id', params.id).update(payload)
      response.redirect('/item/list/' + payload.category)
    } catch (error) {
      console.log(error);
    }
  }

  public async apiDelete({ response, params }: HttpContextContract) {
    await Item.query().where('id', params.id).delete()
    response.redirect('/item/list/')
  }


}
