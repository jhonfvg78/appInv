import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {

  //Views 

  public async viewList({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('category/categoryList', { categories: categories })
  }

  public async viewCreate({ view }: HttpContextContract) {
    return view.render('category/categoryCreate')
  }

  public async viewEdit({ view, params }: HttpContextContract) {
    const category = await Category.find(params.id)
    return view.render('category/categoryUpdate', { category: category })
  }

  public async viewDelete({ view, params }: HttpContextContract) {
    const category = await Category.find(params.id)
    return view.render('category/categoryDelete', { category: category })
  }

  //Api
  public async apiStore({ request, response }: HttpContextContract) {
    console.log(request.body());
    const payload = await request.validate(CategoryValidator);
    await Category.create(payload);
    response.redirect('/category/list/')
  }

  public async apiUpdate({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CategoryValidator);
      await Category.query().where('id', params.id).update(payload)
      response.redirect('/category/list/')
    } catch (error) {
      console.log(error);
    }
  }

  public async apiDelete({ response, params }: HttpContextContract) {
    const category = await Category.find(params.id)
    if (category) {
      const items = await Item
        .query()
        .where('category', category.name)

      items.forEach(async item => {        
        item.category="Ninguna"
       console.log(item.$attributes);
       console.log(item.toJSON());
        await Item.query().where('id', item.id).update(item.toJSON())
      });

      await Category.query().where('id', params.id).delete()
      response.redirect('/category/list/')
    }
  }

}
