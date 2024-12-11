//identifiant : pierre : XqSn5rM35sQT
//identifiant : enzo : jwIAKDpQjq

let token = null



let params = { //avoir le token
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "enzo",
        password: "jwIAKDpQjq",
    })
}

fetch('https://felix.esdlyon.dev/login', params)
    .then(response => response.json())
    .then(data => {
        console.log(data.token)
        token = data.token
        console.log("coucou",token)
        answer()

    });



function answer(){
    let paramsIA = { //utiliser le token
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
    },
    body: JSON.stringify({
        prompt : "salut je m'appelle enzo"
    })
}
    fetch('https://felix.esdlyon.dev/ollama', paramsIA)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });
}

if(!token){
    displayLoginPage()
}else{
    displayChatInterface()
}