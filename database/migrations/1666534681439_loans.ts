import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'loans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')    
      table.timestamp('admission')   
      table.integer('user_id')       
      table.integer('item_id')    
      table.string('reference')
      table.integer('quantity')  
      table.text('image')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
