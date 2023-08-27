
// Modifica las unidades de uno de los productos del carrito. La llamada viene desde el carrito.
async function modprodcart(pid,elem) {
    let selector = document.getElementById(elem)
    let quantity = selector.value

    try {
        let response = await fetch(`/api/carts/64cc17b302a4e5bd2baa41f6/product/${pid}/${quantity}`, {
            method: 'PUT'
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
        let response = await fetch(`/api/carts/64cc17b302a4e5bd2baa41f6/product/${pid}`, {
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