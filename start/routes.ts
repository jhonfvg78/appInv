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
// import CategoryFactory from 'Database/factories/CategoryFactory'
// import GroupFactory from 'Database/factories/GroupFactory'
// import ItemFactory from 'Database/factories/ItemFactory'
import LoanFactory from 'Database/factories/LoanFactory'
// import UserFactory from 'Database/factories/UserFactory'


Route.get('/', async ({ view }) => {
  //  await ItemFactory.createMany(2000)  
  // await CategoryFactory.createMany(50)

  //const users = await UserFactory.createMany(100)

  //await LoanFactory.createMany(20)

  return view.render('index')
})





Route.group(() => {
  //Views
  Route.get('/search/:value', 'UsersController.viewListGroup') 
  Route.get('/group/:group', 'UsersController.viewListGroup')
  Route.get('/create', 'UsersController.viewCreate')  
  Route.get('/edit/:id', 'UsersController.viewEdit')  
  Route.get('/delete/:id', 'UsersController.viewDelete') 
  //Api
  Route.get('/list/:id', 'UsersController.apiListId')
  Route.get('/select/:id', 'UsersController.apiSelect') 
  Route.post('/delete/:id', 'UsersController.apiDelete')
  Route.post('/store', 'UsersController.apiStore') 
  Route.post('/udpate/:id', 'UsersController.apiUpdate')
}).prefix('/user')

Route.group(() => {
  //Views
  Route.get('/search/:value', 'ItemsController.viewSearch')  
  Route.get('/category/:category', 'ItemsController.viewListCategory')
  Route.get('/maintenance/', 'ItemsController.viewListMaintenance')
  Route.get('/edit/:id', 'ItemsController.viewEdit') 
  Route.get('/delete/:id', 'ItemsController.viewDelete') 
  //Api
  Route.get('/list/:id', 'ItemsController.apiListId')
  Route.post('/delete/:id', 'ItemsController.apiDelete')
  Route.post('/store', 'ItemsController.apiStore') 
  Route.post('/udpate/:id', 'ItemsController.apiUpdate')  
}).prefix('/item')

Route.group(() => {
  //Views  
  Route.get('/groups', 'GroupsController.viewList')
  Route.get('/edit/:id', 'GroupsController.viewEdit')  
  Route.get('/delete/:id', 'GroupsController.viewDelete') 
  //Api
  Route.get('/list/:id', 'GroupsController.apiListId')
  Route.post('/delete/:id', 'GroupsController.apiDelete')
  Route.post('/store', 'GroupsController.apiStore') 
  Route.post('/udpate/:id', 'GroupsController.apiUpdate') 
}).prefix('/group')

Route.group(() => {
  //Views  
  Route.get('/categories', 'CategoriesController.viewList')
  Route.get('/edit/:id', 'CategoriesController.viewEdit')  
  Route.get('/delete/:id', 'CategoriesController.viewDelete') 
  //Api
  Route.get('/list/:id', 'CategoriesController.apiListId')
  Route.post('/delete/:id', 'CategoriesController.apiDelete')
  Route.post('/store', 'CategoriesController.apiStore') 
  Route.post('/udpate/:id', 'CategoriesController.apiUpdate') 
}).prefix('/category')


Route.group(() => {
  //Views
  Route.get('/search/:value', 'LoansController.viewUserSearch') 
  Route.get('/user/:user_id', 'LoansController.viewListLoans') 
}).prefix('/loan')

Route.group(() => {   
  Route.get('/list', 'CartsController.viewList')
  Route.get('/store/:id', 'CartsController.apiStore')  
  Route.get('/loan/:id', 'CartsController.apiStoreLoan')   
  Route.get('/delete', 'CartsController.apiDeleteAll')
  Route.post('/delete/:id', 'CartsController.apiDelete')
}).prefix('/cart')

