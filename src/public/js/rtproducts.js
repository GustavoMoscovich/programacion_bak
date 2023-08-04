const socket = io();

const prd = document.getElementById("prd");

prd.innerHTML = '';

socket.on("listOfProducts", (prods) => {
  let lineproduct = " ";
  const xxx = Object.values(prods);
  console.log(typeof  xxx  )
  console.log( xxx );
  xxx.forEach((e) => {
    lineproduct += `ID: ${e.id} -- Código: ${e.code} -- Descr: ${e.description} -- Precio: ${e.price}  <br/>`;
  });
  prd.innerHTML = lineproduct;
});
