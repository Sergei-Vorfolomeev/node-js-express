import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routers/products-router";
import {runDb} from "./repositories/db";

// create express app
const app = express()

// define port
const port = process.env.mongoPORT || 3000

const parserMiddleware = bodyParser()

app.use(parserMiddleware)
app.use('/products', productsRouter)

// start app
const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
