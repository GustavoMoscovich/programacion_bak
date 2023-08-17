
async function addToCart (elem) {

    let selector = document.getElementById(elem)

    let quantity = selector.value

    if (quantity>0) {
        
        try {
            let response = await fetch(`/api/carts/64cc17b302a4e5bd2baa41f6/product/${elem}/${quantity}`, {
                method: 'PUT'
            })
            response = await response.json()
            if (response.status===200) {
                //socket.emit('upd_cart',null)
                //location.replace('/cart.html?cid=1')
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Insert units!')
    }
}

function findText () {
    let selector = document.getElementById('searchtext')
    let texttosearch = selector.value
    location.replace('/?search='+texttosearch)
}

