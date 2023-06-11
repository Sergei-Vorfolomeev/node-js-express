import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routers/products-router";

// create express app
const app = express()

// define port
const port = 3000

const parserMiddleware = bodyParser()

app.use(parserMiddleware)
app.use('/products', productsRouter)

// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})