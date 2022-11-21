import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Item from 'App/Models/item';
import Loan from 'App/Models/Loan';
import User from 'App/Models/User';
import { DateTime } from 'luxon';
import userSelect from './userSelect';


export default class CartsController {
  //Views
  public async viewList({ view }: HttpContextContract) {
    let userS = await new userSelect().select()
    const carts = await Cart.all()
    return view.render('cart/cartList', { carts: carts, userS: userS })
  }

  //Api
  public async apiStore({ params, response }: HttpContextContract) {
    const cart = await Cart.findBy('item_id', params.id)
    if (!cart) {
      const item = await Item.find(params.id)
      if (item) {
        let cartTemp = new Cart();
        cartTemp.reference = item.reference;
        cartTemp.quantity = 1;
        cartTemp.available = item.available;
        cartTemp.location = item.location;
        cartTemp.image = item.image;
        cartTemp.item_id = item.id;
        await cartTemp.save()
        response.redirect('/item/category/' + item.category_id)
      }
    }
    response.redirect('/item/category/0')
  }

  public async apiStoreLoan({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    const carts = await Cart.all()
    if (user) {
      carts.forEach(async cart => {
        //const item = await Item.find(cart.item_id)
        const loanExist = await Loan
          .query()
          .where('user_id', user.id)
          .where('item_id', cart.item_id).first()

        if (loanExist) {
          loanExist.quantity += cart.quantity
          await loanExist.save()
        }
        else {
          var loan = new Loan();
          loan.admission = DateTime.now();
          loan.user_id = user.id;
          loan.item_id = cart.id;
          loan.reference = cart.reference;
          loan.quantity = cart.quantity;
          loan.image = cart.image;
          await loan.save()
        }
      });
      await Cart.truncate();
    }
    response.redirect('/cart/list')
  }


  public async apiDelete({ response, params }: HttpContextContract) {
    const cart = await Cart.findOrFail(params.id)
    await cart.delete()
    response.redirect('/cart/list')
  }

  public async apiDeleteAll({ response }: HttpContextContract) {
    await Cart.truncate();
    response.redirect('/cart/list')
  }

}
