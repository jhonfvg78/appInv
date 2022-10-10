import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Item from 'App/Models/item';
import CartValidator from 'App/Validators/CartValidator';

export default class CartsController {

  //Views
  public async viewList({ view }: HttpContextContract) {
    const carts = await Cart.all()
    return view.render('cart/cartList', { carts: carts })
  }

  //Api
  public async apiStore({ params,response }: HttpContextContract) {
    const item = await Item.find(params.id)
    if (item) {
      const cart = await Cart.find(params.id)
      if (cart) {
        cart.quantity = cart.quantity + 1;
        await cart.save()
        response.redirect().back()
      }
      else {
        let cartTemp = new Cart();
        cartTemp.id= item.id;
        cartTemp.reference = item.reference;
        cartTemp.quantity = 1;
        cartTemp.image = item.image;
        await cartTemp.save()
        response.redirect().back()
      }      
    }
  }

  public async apiDelete({ response, params }: HttpContextContract) {
    await Cart.query().where('id', params.id).delete()
    response.redirect('/cart/list/')
  }
}