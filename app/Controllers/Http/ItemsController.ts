import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {

  //Views
  public async viewListTag({ view, params }: HttpContextContract) {
    const items = await Item
      .query()
      .where('tag', params.tag)
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  }

  public async viewListReference({ view, params }: HttpContextContract) {
    const items = await Item
      .query()
      .where('reference', 'LIKE', '%' + params.reference + '%')
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  }

  public async viewListCategory({ view, params }: HttpContextContract) {
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

  public async viewEdit({ view, params }: HttpContextContract) {
    const categories = await Category.all()
    const item = await Item.find(params.id)
    return view.render('item/itemUpdate', { item: item, categories: categories })
  }

  //Api
  public async apiListId({ params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return item
  }

  public async apiStore({ request, response }: HttpContextContract) {
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    response.redirect('/item/category/Ninguna')
  }

  public async apiUpdate({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator);
      await Item.query().where('id', params.id).update(payload)
      response.redirect('/item/category/' + payload.category)
    } catch (error) {
      console.log(error);
    }
  }

  public async apiDelete({ response, params }: HttpContextContract) {
    await Item.query().where('id', params.id).delete()
    response.redirect('/item/category/Ninguna')
  }


}
