import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_CONNECTION_STRING || 'mongodb://mongodb:27017')
const db = client.db(process.env.DATABASE_NAME || 'supernova')
const account = db.collection('account')

export { account }
