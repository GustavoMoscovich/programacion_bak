import __dirname from "../utils.js"

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce Moscovich - CoderHouse BAK",
      description: "Documentación de las APIs"
    }
  },
  apis: [`${__dirname}/docs/*.yaml`]
}

export default options