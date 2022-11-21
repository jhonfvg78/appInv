import Cart from 'App/Models/Cart'
import Item from 'App/Models/item'
import User from 'App/Models/User'
import UserSelect from 'App/Models/UserSelect'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  socket.on('wsCartQuantity', async (data) => {
    const cart = await Cart.findOrFail(data.id)
    cart.quantity = data.value;
    await cart.save()
  })

  socket.on('wsItemAdd', async (data) => {
    const item = await Item
      .query()
      .where('tag', data.value)
      .where('status', 'Disponible').first()

    if (item) {
      let cartTemp = new Cart();
      cartTemp.reference = item.reference;
      cartTemp.quantity = 1;
      cartTemp.available = item.available;
      cartTemp.location = item.location;
      cartTemp.image = item.image;
      cartTemp.item_id = item.id;
      await cartTemp.save()
      socket.emit('refreshCart', "")
    }
  })


  socket.on('wsUserSelect', async (data) => {
    let user;
    user = await User
      .query()
      .where('identification', data.value).first()
    if (!user) {
      user = await User
        .query()
        .where('tag', data.value).first()
    }
    if (user) {
      await UserSelect.truncate();
      let userselect = new UserSelect();
      userselect.user_id = user.id;
      await userselect.save();
      socket.emit('refreshCart', "")
    }
    
  })



})
