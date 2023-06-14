import {Request, Response, Router} from "express";
import {ProductType} from "../repositories/products-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsService} from "../services/products-service";

export const productsRouter = Router()

const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('Title should be from 3 to 10 symbols')

// GET
productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsService.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})
productsRouter.get(`/:id`, async (req: Request, res: Response) => {
    const foundProduct: ProductType | null = await productsService.findProductById(+req.params.id)
    if (foundProduct) {
        res.send(foundProduct)
    } else res.send(400)
})

// DELETE
productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsService.deleteProduct(+req.params.id)
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
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsService.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })

//PUT
productsRouter.put(
    '/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const updatedProduct: ProductType | null = await productsService.updateProduct(+req.params.id, req.body.title)
        if (updatedProduct) {
            res.status(200).send(updatedProduct)
        } else {
            res.send(404)
        }
    })