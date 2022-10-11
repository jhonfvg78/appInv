import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Item from 'App/Models/item';


export default class CartsController {

  //Views
  public async viewList({ view }: HttpContextContract) {
    const carts = await Cart.all()
    let totalItems: number = 0
    carts.forEach(cart => {
      totalItems += cart.quantity
    });
    return view.render('cart/cartList', { carts: carts, totalItems: totalItems })
  }

  //Api
  public async apiStore({ params, response, view }: HttpContextContract) {
    const item = await Item.find(params.id)
    if (item) {
      const cart = await Cart.find(params.id)
      if (cart) {
        if (cart.quantity < item.quantity) {
          cart.quantity = cart.quantity + 1;
          await cart.save()
          response.redirect().back()
        }
        else {
          
         
        }
      }
      else {
        let cartTemp = new Cart();
        cartTemp.id = item.id;
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
