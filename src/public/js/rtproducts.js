const socket = io();

const prd = document.getElementById("prd");

prd.innerHTML = '';

socket.on("listOfProducts", (prods) => {
  let lineproduct = " ";
  console.log(typeof { prods } )
  console.log({ prods });
  prods.products.forEach((e) => {
    lineproduct += `ID: ${e.id} -- Código: ${e.code} -- Descr: ${e.description} -- Precio: ${e.price}  <br/>`;
  });
  prd.innerHTML = lineproduct;
});
