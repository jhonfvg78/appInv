import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Item from 'App/Models/item'
import CategoryValidator from 'App/Validators/CategoryValidator'
import userSelect from './userSelect'

export default class CategoriesController {

  //Views 
  public async viewList({ view }: HttpContextContract) {
    let userS = await new userSelect().select()
    const categories = await Category.all()
    return view.render('category/categoryList', { categories: categories, userS: userS })
  }

  public async viewEdit({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()
    const category = await Category.find(params.id)
    return view.render('category/categoryUpdate', { category: category, userS: userS })
  }

  public async viewDelete({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()
    const category = await Category.find(params.id)
    return view.render('category/categoryDelete', { category: category, userS: userS })
  }

  //Api
  public async apiStore({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator);
    await Category.create(payload);
    response.redirect('/category/categories')
  }

  public async apiUpdate({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator);
    const category = await Category.find(params.id)
    if (category) {
      category.merge(payload).save()
      response.redirect('/category/categories')
    }

    // try {
    //   const payload = await request.validate(CategoryValidator);
    //   await Category.query().where('id', params.id).update(payload)
    //   response.redirect('/category/categories')
    // } catch (error) {
    //   console.log(error);
    // }
  }

  public async apiDelete({ view, request, response, params }: HttpContextContract) {
    let data = request.body();
    if (data.name == data.confirm_name) {
      const category = await Category.find(params.id)
      if (category) {
        const items = await Item
          .query()
          .where('category_id', category.id)
        items.forEach(async item => {
          item.category_id = 0
          await item.save()
        });
        await category.delete()
        response.redirect('/category/categories')
      }
    }
    else {
      return view.render('shared/messages', { source: "categoryDelete", name: data.name })
    }
  }


  // const category = await Category.find(params.id)
  // if (category) {
  //   const items = await Item
  //     .query()
  //     .where('category', category.name)

  //   items.forEach(async item => {        
  //     item.category="NA"
  //    console.log(item.$attributes);
  //    console.log(item.toJSON());
  //     await Item.query().where('id', item.id).update(item.toJSON())
  //   });

  //   await Category.query().where('id', params.id).delete()
  //   response.redirect('/category/categories')
  // }
}


