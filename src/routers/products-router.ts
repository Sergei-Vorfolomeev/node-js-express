import {Request, Response, Router} from "express";
import {productRepository} from "../repositories/products-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const productsRouter = Router()

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('Title should be from 3 to 10 symbols')

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
productsRouter.post(
    '/',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newProduct = productRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

//PUT
productsRouter.put(
    '/:id',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const updatedProduct = productRepository.updateProduct(+req.params.id, req.body.title)
    if (updatedProduct) {
        res.status(200).send(updatedProduct)
    } else {
        res.send(404)
    }
})