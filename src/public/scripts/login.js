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


/* document.getElementById('loginGitHub').addEventListener('click',(event)=> {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    fetch('/api/auth/github',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res=>res.json())
        .then(res=> {
            alert(res.message)
            window.location.replace('/')})
        .catch(err=>console.log(err))
})
 */

function loginGitHub () {

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log('email ',email)
    console.log('password ',password)

    fetch('/api/auth/github',{
        method: 'POST',
        headers: {  'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                    'Content-Type': 'application/json'
                 },
        body: JSON.stringify({ email, password })
    })
        .then(res=>res.json())
        .then(res=> {
            alert(res.message)
            window.location.replace('/')})
        .catch(err=>console.log(err))
}

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