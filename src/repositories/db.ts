import {MongoClient} from "mongodb";
import {ProductType} from "./products-db-repository";

const mongoURI = process.env.mongoURI || "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoURI)
const db = client.db('shop')
export const productsCollection = db.collection<ProductType>('products')

export async function runDb() {
    try {
        // connect client to the server
        await client.connect()
        // Establish and verify connection
        await client.db("products").command({ping: 1})
        // Log successful message
        console.log('Connected successfully to mongo server')
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}