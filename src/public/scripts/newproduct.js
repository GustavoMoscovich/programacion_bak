let selector = document.getElementById('newProduct')
selector.addEventListener('click',(event)=> {
    event.preventDefault()
    let title = document.getElementById('productTitle').value
    let description = document.getElementById('productDescription').value
    let price = document.getElementById('productPrice').value
    let stock = document.getElementById('productStock').value
    let thumbnails = document.getElementById('productPhoto').value
    let code = document.getElementById('productCode').value
    let category = document.getElementById('productCategory').value

    fetch('/api/products',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title,description,price,stock,thumbnails,code,category })
    })
    .then(res=>res.json())
    .then(res=> {
        alert(res.message)
        if (res.status===201) {
            window.location.replace('/')
        } else {
            window.location.replace('/')
        }
    })
})