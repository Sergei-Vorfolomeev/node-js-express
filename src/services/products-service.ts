import {productsRepository, ProductType} from "../repositories/products-db-repository";

export const productsService = {
    async findProducts(searchItem: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(searchItem)
    },
    async findProductById(id: number): Promise<ProductType | null> {
        return await productsRepository.findProductById(id)
    },
    async deleteProduct(id: number): Promise<boolean> {
        return await productsRepository.deleteProduct(id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        return await productsRepository.createProduct(newProduct)
    },
    async updateProduct(id: number, title: string): Promise<ProductType | null> {
        return await productsRepository.updateProduct(id, title)
    }
}