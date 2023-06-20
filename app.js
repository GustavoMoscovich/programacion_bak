import express from "express";
import ProductManager from "./managers/ProductManager.js";

const app = express();

app.use(express.urlencoded({extended:true}));

const prodManager = new ProductManager ('./files/products.txt');

// si se pasa el query ?limit=XX devuelve solo los XX productos caso contrario se pasan todos los productos
app.get('/products', (req, res) => {  
    const {limit} = req.query
 
    const products = prodManager.getProducts();
    if (Number(limit)>0) {
        res.send(products.slice(0,limit))
    } else {res.send(products)
    }
})


// busca productos por ID. Si existe el ID buscado devuelve el objeto, caso contrario muestra mensaje que no existe
app.get('/products/:id', (req, res) => {  
    const prodId = Number(req.params.id)
 
    const product = prodManager.getProductById(prodId);

    if (Object.keys(product).length != 0) {
        res.send(product)
    } else {res.send( `<h1>El id del producto no existe en la base de datos</h1>`)
    }
})

app.listen(8080, () => console.log('Servidor Express en puerto 8080'));
