const products = [
    {id: 0, title: 'tomato'},
    {id: 1, title: 'orange'},
    {id: 2, title: 'apple'},
    {id: 3, title: 'cucumber'},
    {id: 4, title: 'banana'},
    {id: 5, title: 'blueberry'},
]

export const productRepository = {
    findProducts (searchItem: string | null | undefined) {
        if (searchItem) {
            return products.filter(el => el.title.indexOf(searchItem) > -1)
        } else {
            return products
        }
    },
    findProductById (id: number) {
        return products.find(el => el.id === id)
    },
    createProduct (title: string) {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    deleteProduct (id: number) {
        const productIndex = products.findIndex(el => el.id === id)
        if (productIndex > -1) {
            products.splice(productIndex, 1)
            return true
        } else {
            return null
        }
    },
    updateProduct (id: number, title: string) {
        const foundProduct = products.find(el => el.id === id)
        if (foundProduct) {
            foundProduct.title = title
            return foundProduct
        } else {
           return null
        }
    }
}