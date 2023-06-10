"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// create express app
const app = (0, express_1.default)();
//define port
const port = 3000;
const products = [
    { id: 0, title: 'tomato' },
    { id: 1, title: 'orange' }
];
const addresses = [
    { id: 0, value: 'Italska 56' },
    { id: 1, value: 'Norska 38' },
];
// GET
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(el => el.title.indexOf(searchString) > -1));
    }
    else
        res.send(products);
});
app.get(`/products/:id`, (req, res) => {
    const product = products.find(el => el.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else
        res.send(400);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(el => el.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else
        res.send(400);
});
// DELETE
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(el => el.id === +req.params.id);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        res.send(204);
    }
    else
        res.send(404);
    // using 'for'
    // for (let i=0; i<products.length; i++) {
    //     if (products[i].id === +req.params.id) {
    //         products.splice(i, 1)
    //         res.send(204)
    //         return
    //     }
    // }
    // res.send(404)
});
// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
