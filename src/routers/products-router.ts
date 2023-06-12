import {Request, Response, Router} from "express";
import {productRepository} from "../repositories/products-repository";

export const productsRouter = Router()



// GET
productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})
productsRouter.get(`/:id`, (req: Request, res: Response) => {
    const foundProduct = productRepository.findProductById(+req.params.id)
    if (foundProduct) {
        res.send(foundProduct)
    } else res.send(400)
})

// DELETE
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

// POST
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

//PUT
productsRouter.put('/:id', (req: Request, res: Response) => {
    const updatedProduct = productRepository.updateProduct(+req.params.id, req.body.title)
    if (updatedProduct) {
        res.status(200).send(updatedProduct)
    } else {
        res.send(404)
    }
})