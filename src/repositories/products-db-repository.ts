import {productsCollection} from "./db";

export type ProductType = {
    id: number
    title: string
}

export const productRepository = {
    async findProducts (searchItem: string | null | undefined): Promise<ProductType[]> {
        let filter = {}
        if (searchItem) {
            filter = {title: {$regex: searchItem}}
        }
        return await productsCollection.find(filter).toArray()
    },
    async findProductById (id: number): Promise<ProductType | null> {
        const foundProduct: ProductType | null = await productsCollection.findOne({id})
        if (foundProduct) {
            return foundProduct
        } else {
            return null
        }
    },
    async deleteProduct (id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async createProduct (title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct (id: number, title: string): Promise<ProductType | null> {
        const result = await productsCollection.updateOne({id}, {$set: {title}})
        if (result.matchedCount === 1) {
           return await productsCollection.findOne({id})
        } else {
            return null
        }
    }
}