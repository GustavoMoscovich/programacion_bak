import { Router } from "express";
import { faker } from '@faker-js/faker';
import ProdsRepository from '../../repositories/products.rep.js';

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
    let prodRepo = new ProdsRepository();
    for (let i = 0; i < 1; i++) {
      let data = product();
      response =  await  prodRepo.createModel(data);
    }

   
    return res.status(201).json({
      success: true,
      message: `se han registrado los productos`,
    });
 
  } catch (error) { }
})

export default router
