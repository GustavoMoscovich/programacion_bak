
async function addToCart (elem) {

    let selector = document.getElementById(elem)

    let quantity = selector.value

    if (quantity>0) {
        
        try {

            //let response = await fetch(`/api/carts/64f1ecb49a076347728ff9cc/product/${elem}/${quantity}`, {
            let response = await fetch(`/api/carts/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: `{ "product_id": "${elem}", "quantity": ${quantity} }`
    
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
    location.replace('/?search='+texttosearch+'&page=1')
}

function selectPage (page) {
    location.replace('/?page='+page)
}

