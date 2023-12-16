const { MongoClient } = require('mongodb')

const mongUri = 'mongodb+srv://qax:xperience@cluster0.h3plhkv.mongodb.net/markdb?retryWrites=true&w=majority'

const client = new MongoClient(mongUri)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }