import { Router } from "express";
import { faker } from '@faker-js/faker';
import ProdsController from '../../controllers/products.controller.js'

const router = Router();

const product = () => {

  let title = faker.commerce.product()
  let description = faker.commerce.productDescription()
  let code = faker.commerce.isbn(10)
  let price = faker.number.int({ min: 25000, max: 268000 })
  let status = true
  let stock = faker.number.int({ min: 0, max: 100 })
  let category = faker.commerce.department()
  let thumbnails = [faker.image.urlLoremFlickr()]


  return { title, description, code, price, status, stock, category, thumbnails }
}

router.post("/", async (req, res) => {

  try {
    let prodContr = new ProdsController();
    for (let i = 0; i < 100; i++) {
      let data = product();
      console.log('Creando: ',i)
      response =  await  prodContr.createController(data);
      console.log('Creado: ')
    }

   
    return res.status(201).json({
      success: true,
      message: `se han registrado los productos`,
    });
 
  } catch (error) { }
})

export default router
