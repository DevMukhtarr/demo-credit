import path from 'path'
import knex from 'knex'
import schemaInspector from 'knex-schema-inspector';

require('dotenv/config')

const config  = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port : 3306,
      database : 'democredit',
      user : 'root',
      password : 'admin',
    },
    migrations: {
      // tableName: path.resolve(__dirname, 'src', 'database', 'migrations')
      tableName: 'migrations',
      directory: "./migrations"
    },
    seeds: { directory: "./seeds" },
    useNullAsDefault: true
  }
}
export const db = knex(config['development'])

export const inspector = schemaInspector(db);

const hasTable = async () =>{
  await db.schema.hasTable('users').then((created) =>{
    if(created == false){
      db.schema.createTable('users', (table) =>{
        table.increments(); // integer id

        table.string('firstname');
        table.string('lastname');
        table.string('username');
        table.string('email');
        table.string('password');
        table.integer('demowallet').defaultTo(0);
      }).then(() =>{
        console.log('users table created')
      }).catch(() =>{
        console.log("an error occurred")
      })

      db.schema.createTable('transaction_history', (table) =>{
        table.increments(); // integer id

        table.string('username');
        table.string('transaction_reference');
        table.integer('credit');
        table.integer('debit');
        table.integer('balance');
      }).then(() =>{
        console.log('transaction history table created')
      }).catch(() =>{
        console.log("an error occurred")
      })
    }
  })
} 

hasTable()


db.raw("SELECT VERSION()").then((version) => console.log((version[0][0]))
).catch((err) => { console.log( err); throw err })

db('users')