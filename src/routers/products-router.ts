import {Request, Response, Router} from "express";

export const productsRouter = Router()

const products = [
    {id: 0, title: 'tomato'},
    {id: 1, title: 'orange'}
]

// GET
productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    } else res.send(products)

})
productsRouter.get(`/:id`, (req: Request, res: Response) => {
    const product = products.find(el => el.id === +req.params.id)
    if (product) {
        res.send(product)
    } else res.send(400)
})

// DELETE
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const productIndex = products.findIndex(el => el.id === +req.params.id)
    if (productIndex > -1) {
        products.splice(productIndex, 1)
        res.send(204)
    } else res.send(404)

    // using 'for'
    // for (let i=0; i<products.length; i++) {
    //     if (products[i].id === +req.params.id) {
    //         products.splice(i, 1)
    //         res.send(204)
    //         return
    //     }
    // }
    // res.send(404)
})

// POST
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

//PUT
productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = products.find(el => el.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.status(200).send(product)
    } else res.send(404)
})