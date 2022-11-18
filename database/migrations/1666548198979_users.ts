import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identification').notNullable().unique()
      table.string('tag', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('phone', 255).notNullable()
      table.string('group', 255).notNullable()
      table.text('photo').notNullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
