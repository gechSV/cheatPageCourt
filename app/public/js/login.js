// Front-end авторизация
function sendDataAuth(){
    let response = fetch('/auth', {
        method: 'POST',
        body: JSON.stringify({
            'login': document.querySelector('#login').value,
            'password': document.querySelector('#password').value
        }), 
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(function(response){
        let error = response.status

        if(error == 401){
            console.log('Password or login error :(')
        }

        if (error == 200){
            response.json().then((data) => {

                document.cookie = `Authorization=${data.token}`

                let getAdmin = fetch('/admin', {
                    method: 'GET',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json',
                    } 
                }).then(function(){
                    window.open('/admin','_self')
                })
                
            })
        } 
    })
}

document.querySelector('#authId').onsubmit = function(event) {
    event.preventDefault()
    sendDataAuth()
}