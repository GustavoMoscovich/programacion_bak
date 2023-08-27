document.getElementById('login').addEventListener('click',(event)=> {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    fetch('/api/auth/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res=>res.json())
        .then(res=> {
            alert(res.message)
            window.location.replace('/')})
        .catch(err=>console.log(err))
})


function logOut () {
    fetch('/api/auth/signout',{
        method: 'POST'
    })
        .then(res=>res.json())
        .then(res=> {
            alert(res.message)
            window.location.replace('/')}    )
        .catch(err=>console.log(err))    
}