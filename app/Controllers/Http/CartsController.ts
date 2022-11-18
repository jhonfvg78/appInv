import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Item from 'App/Models/item';
import Loan from 'App/Models/Loan';
import User from 'App/Models/User';
import UserSelect from 'App/Models/UserSelect';
import { DateTime } from 'luxon';

export default class CartsController {
  //Views
  public async viewList({ view }: HttpContextContract) {
    let user:any
    const userSelect = await UserSelect.first()
    if(userSelect){
        user = await User.find(userSelect.user_id)  
    } 
    const carts = await Cart.all()
    let totalItems = 0
    carts.forEach(cart => {
      totalItems += cart.quantity
    });
    if (user) {
      return view.render('cart/cartList', { carts: carts, user: user, totalItems: totalItems, mode: true })
    }
    else {
      return view.render('cart/cartList', { carts: carts, user: user, totalItems: totalItems, mode: false })
    }
  }

  //Api
  public async apiStore({ params, response }: HttpContextContract) {
    const cart = await Cart
          .query()          
          .where('item_id', params.id).first()
    //const cart = await Cart.find(params.id)
    if (cart == null) {
      const item = await Item.find(params.id)
      if (item) {
        let cartTemp = new Cart();
        cartTemp.item_id = item.id;
        cartTemp.reference = item.reference;
        cartTemp.quantity = 1;        
        cartTemp.image = item.image;
        await cartTemp.save()
      }
    }
    response.redirect('/cart/list/0')
  }

  public async apiStoreLoan({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    const carts = await Cart.all()
    if (user) {
      carts.forEach(async cart => {
        const item = await Item.find(cart.item_id)

        const loanExist = await Loan
          .query()
          .where('user_id', user.id)
          .where('item_id', cart.id).first()
        if (loanExist) {
          loanExist.quantity += cart.quantity
          await Loan.query().where('id', loanExist.id).update(loanExist)
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
        if (item)
          await Item.query().where('id', params.id).update(item)
      });
      await Cart.truncate();
    }
    response.redirect('/cart/list/' + params.id)
  }


  public async apiDelete({ response, params }: HttpContextContract) {
    await Cart.query().where('id', params.id).delete()
    response.redirect('/cart/list/0')
  }

  public async apiDeleteAll({ response }: HttpContextContract) {
    await Cart.truncate();
    response.redirect('/cart/list/0')
  }
}
