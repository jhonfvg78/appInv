import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import ItemValidator from 'App/Validators/ItemValidator'
import userSelect from './userSelect'

export default class ItemsController {

  //Views
  public async viewSearch({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

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
    return view.render('item/itemList', { items: items, categories: categories, category: 0, userS: userS })
  }

  public async viewListCategory({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const items = await Item
      .query()
      .where('category_id', params.category_id)
      .where('status', 'Disponible')
    const category = await Category.find(params.category_id)
    let categoryName = "NA"
    if (category)
      categoryName = category.name
    const categories = await Category.all()
    return view.render('item/itemList', { items: items, mode: false, categories: categories, category: categoryName, userS: userS  })
  }

  public async viewListMaintenance({ view }: HttpContextContract) {
    let userS = await new userSelect().select()   

    let count = 0;
    const items = await Item
      .query()
      .where('status', 'Mantenimiento')
    if (items)
      count = items.length
    return view.render('item/itemList', { items: items, mode: true, count: count, userS: userS  })
  }

  public async viewCreate({ view }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const categories = await Category.all()
    return view.render('item/itemCreate', { categories: categories, userS: userS  })
  }

  public async viewEdit({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const categories = await Category.all()
    const item = await Item.find(params.id)
    return view.render('item/itemUpdate', { item: item, categories: categories, userS: userS  })
  }

  public async viewDelete({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()   

    const item = await Item.find(params.id)
    return view.render('item/itemDelete', { item: item, userS: userS  })
  }

  //Api
  public async apiListId({ params }: HttpContextContract) {
    const item = await Item.find(params.id)
    return item
  }

  public async apiStore({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(ItemValidator);
    await Item.create(payload);
    session.flash('success', 'El elemento se registró satisfactoriamente.')
    response.redirect('/item/category/' + payload.category_id)
  }

  public async apiUpdate({ view, params, request, response, session }: HttpContextContract) {

    const payload = await request.validate(ItemValidator);
    const item = await Item.findOrFail(params.id)
    await item.merge(payload).save()
    session.flash('success', 'El elemento se actualizó satisfactoriamente.')
    response.redirect('/item/category/' + payload.category_id)

    // const payload = await request.validate(ItemValidator);
    // const user = await User.findOrFail(params.id)
    // await user.merge(payload).save()
    // session.flash('success', 'El usuario se actualizó satisfactoriamente.')
    // response.redirect('/user/group/' + payload.group_id)


    // const payload = await request.validate(ItemValidator);

    // const loans = await Loan
    //   .query()
    //   .where('item_id', params.id)
    // let totalItems = 0;
    // loans.forEach(loan => {
    //   totalItems += loan.quantity;
    // });
    // if (totalItems > payload.quantity) {
    //   return view.render('shared/messages', { source: "itemUpdate", totalItems: totalItems, reference: payload.reference })
    // }
    // else {
    //   payload.available = payload.quantity - totalItems;
    //   await Item.query().where('id', params.id).update(payload)
    // }
    // response.redirect('/item/category/' + payload.category_id)

  }

  public async apiDelete({ view, response, request, params }: HttpContextContract) {
    let data = request.body();
    if (data.reference == data.confirm_reference) {
      await Item.query().where('id', params.id).delete()
      response.redirect('/item/category/0')
    }
    else {
      return view.render('shared/messages', { source: "itemDelete", reference: data.reference })
    }
  }


}
