/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import CategoryFactory from 'Database/factories/CategoryFactory'
import ItemFactory from 'Database/factories/ItemFactory'


Route.get('/', async ({ view }) => {
  //  await ItemFactory.createMany(2000)  
  // await CategoryFactory.createMany(50)
  return view.render('index')
})

Route.group(() => {
  Route.get('/tag/:tag', 'ItemsController.viewTag')
  Route.get('/reference/:reference', 'ItemsController.viewReference')
  Route.get('/list/:category', 'ItemsController.viewList')
  Route.get('/detail/:id', 'ItemsController.viewDetail')
  Route.get('/create', 'ItemsController.viewCreate')
  Route.get('/edit/:id', 'ItemsController.viewEdit')  
  Route.get('/delete/:id', 'ItemsController.viewDelete')  
  Route.post('/store', 'ItemsController.apiStore') 
  Route.post('/udpate/:id', 'ItemsController.apiUpdate')
  Route.post('/delete/:id', 'ItemsController.apiDelete')
}).prefix('/item')


Route.group(() => {
  Route.get('/list/', 'CategoriesController.viewList')
  Route.get('/create', 'CategoriesController.viewCreate')
  Route.get('/edit/:id', 'CategoriesController.viewEdit')  
  Route.get('/delete/:id', 'CategoriesController.viewDelete')  
  Route.post('/store', 'CategoriesController.apiStore') 
  Route.post('/udpate/:id', 'CategoriesController.apiUpdate')
  Route.post('/delete/:id', 'CategoriesController.apiDelete')
}).prefix('/category')

Route.group(() => {   
  Route.get('/list/', 'CartsController.viewList').as('cart.show') 
  Route.get('/store/:id', 'CartsController.apiStore')   
  Route.post('/delete/:id', 'CartsController.apiDelete')
}).prefix('/cart')

