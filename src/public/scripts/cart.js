
// Modifica las unidades de uno de los productos del carrito. La llamada viene desde el carrito.
async function modprodcart(pid,elem) {
    let selector = document.getElementById(elem)
    let quantity = selector.value

    try {
        let response = await fetch(`/api/carts/${pid}/${quantity}`, {
        //let response = await fetch(`/api/carts/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
        response = await response.json()
        if (response.status===200) {
            location.replace('/cart')
        }else {
            alert(response.message)
            location.replace('/cart')
        }
    } catch (error) {
        console.log(error);
    }
}

// Elimina uno de los productos del carrito. La llamada viene desde el carrito
async function delprodcart(pid) {
    try {
        let response = await fetch(`/api/carts/${pid}`, {
            method: 'DELETE'
        })
        response = await response.json()
        console.log('RESPONSE: ',response);
        if (response.status===200) {
            location.replace('/cart')
        } else {
            location.replace('/cart')
            alert(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}                     