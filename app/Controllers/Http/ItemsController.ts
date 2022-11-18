import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import Loan from 'App/Models/Loan'
import ItemValidator from 'App/Validators/ItemValidator'

export default class ItemsController {

  //Views
  public async viewSearch({ view, params }: HttpContextContract) {
    let items;
    items = await Item
      .query()
      .where('tag', params.value)
      .where('status', 'Disponible')

    if (items == 0) {
      items = await Item
        .query()
        .where('reference', 'LIKE', '%' + params.value + '%')
        .where('status', 'Disponible')
    }
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  }


  // public async viewListTag({ view, params }: HttpContextContract) {
  //   const items = await Item
  //     .query()
  //     .where('tag', params.tag)
  //   const categories = await Category.all()
  //   return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  // }

  // public async viewListReference({ view, params }: HttpContextContract) {
  //   const items = await Item
  //     .query()
  //     .where('reference', 'LIKE', '%' + params.reference + '%')
  //   const categories = await Category.all()
  //   return view.render('item/itemList', { items: items, categories: categories, category: "Todas" })
  // }

  public async viewListCategory({ view, params }: HttpContextContract) {
    const carts = await Cart.all()
    let totalItems: number = 0
    carts.forEach(cart => {
      totalItems += cart.quantity
    });
    const items = await Item
      .query()
      .where('category', params.category)
      .where('status', 'Disponible')
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, mode: false, categories: categories, category: params.category, totalItems: totalItems })
  }

  public async viewListMaintenance({ view }: HttpContextContract) {
    let count = 0;
    const items = await Item
      .query()
      .where('status', 'Mantenimiento')
    if (items)
      count = items.length
    return view.render('item/itemList', { items: items, mode: true, count: count })
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
  public async apiListId({ params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return item
  }

  public async apiStore({ request, response }: HttpContextContract) {
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    response.redirect('/item/category/NA')
  }

  public async apiUpdate({ view, params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ItemValidator);
      
      const loans = await Loan
        .query()
        .where('item_id', params.id)
      let totalItems = 0;
      loans.forEach(loan => {
        totalItems += loan.quantity;
      });
      if (totalItems > payload.quantity) {
        return view.render('shared/messages', { source: "itemUpdate", totalItems: totalItems, reference:payload.reference })
      }
      else {
        payload.available = payload.quantity - totalItems;
        await Item.query().where('id', params.id).update(payload)
      }
      response.redirect('/item/category/' + payload.category)
    } catch (error) {
      console.log(error.messages);
    }
  }

  public async apiDelete({ view, response, request, params }: HttpContextContract) {  
   let data =request.body();
    if(data.reference==data.confirm_reference){
      await Item.query().where('id', params.id).delete()
      response.redirect('/item/category/NA')
    }
    else{
      return view.render('shared/messages', { source: "itemDelete", reference:data.reference })
    }    
  }
 

}
