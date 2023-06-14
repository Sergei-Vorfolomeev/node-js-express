export type ProductType = {
    id: number
    title: string
}

const products: ProductType[] = [
    {id: 0, title: 'tomato'},
    {id: 1, title: 'orange'},
    {id: 2, title: 'apple'},
    {id: 3, title: 'cucumber'},
    {id: 4, title: 'banana'},
    {id: 5, title: 'blueberry'},
]

export const productRepository = {
    async findProducts (searchItem: string | null | undefined): Promise<ProductType[]> {
        if (searchItem) {
            return products.filter(el => el.title.indexOf(searchItem) > -1)
        } else {
            return products
        }
    },
    async findProductById (id: number): Promise<ProductType | null> {
        const foundProduct = products.find(el => el.id === id)
        if (foundProduct) {
            return foundProduct
        } else {
            return null
        }
    },
    async deleteProduct (id: number): Promise<boolean> {
        const productIndex = products.findIndex(el => el.id === id)
        if (productIndex > -1) {
            products.splice(productIndex, 1)
            return true
        } else {
            return false
        }
    },
    async createProduct (title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct (id: number, title: string): Promise<ProductType | null> {
        const foundProduct = products.find(el => el.id === id)
        if (foundProduct) {
            foundProduct.title = title
            return foundProduct
        } else {
           return null
        }
    }
}