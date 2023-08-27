document.getElementById('register').addEventListener('click',(event)=> {
    event.preventDefault()
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value
    fetch('/api/auth/register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})

