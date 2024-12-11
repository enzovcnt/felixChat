//identifiant : pierre : XqSn5rM35sQT
//identifiant : enzo : jwIAKDpQjq

let token = null
const loginPage = document.querySelector('.login')
const chatPage = document.querySelector('.chat')

let premierMessageIA = {
    author : "Felix",
    content : "Bonjour je suis l'IA",
}

let premierMessageUser = {
    author : "enzo",
    content : "Bonjour je suis enzo. Quel est la couleur du ciel ?",
}
let deuxiemeMessageIA = {
    author : "Felix",
    content : "Quelle est ta question ?",
}



let messages = [premierMessageIA, premierMessageUser, deuxiemeMessageIA]
async function login(username, password){
    console.log(username, password)
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }

    return await fetch('https://felix.esdlyon.dev/login', params)
        .then((response) =>  response.json())
        .then((json) => {

            return json.token
        })
}


function displayLoginForm(){

    loginPage.style.display = 'block'
    chatPage.style.display = 'none'

    let username = document.querySelector('.inputUsername')
    let password = document.querySelector('.inputPassword')
    let loginButton = document.querySelector('.loginBtn')
    loginButton.addEventListener('click', ()=>{

        login(username.value, password.value).then((data) => {
            token = data
            displayChat()
            //console.log(token)
        })
    })
}


//let paramsEnzo = { //avoir le token
//    method: "POST",
//    headers: {
//        'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({
//        username: "enzo",
//        password: "jwIAKDpQjq",
//    })
//}


//fetch('https://felix.esdlyon.dev/login', params)
  //  .then(response => response.json())
    //.then(data => {
      //  console.log(data.token)
        //token = data.token
        //console.log("coucou",token)
        //answer()

    //});



function englishAnswer(){
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


function displayMessages(){
    document.querySelector('.messages').innerHTML = ""
    messages.forEach(message => {

        const profilPic = document.createElement("img");
        profilPic.classList.add('profil');
        divMessage = document.createElement('div')
        divMessage.classList.add('message')
        let paragraphe = document.createElement('p')

        paragraphe.textContent = message.content
        divMessage.appendChild(profilPic)
        divMessage.appendChild(paragraphe)


        if(message.author === "Felix")
        {
            divMessage.classList.add('felix')
            paragraphe.classList.add('pIA')
            profilPic.src = "https://picsum.photos/id/48/100";

        }else{
            divMessage.classList.add('user')
            paragraphe.classList.add('pUser')
            profilPic.src = "https://picsum.photos/100";

        }
        document.querySelector('.messages').appendChild(divMessage)
    })



}

function handlePrompt(){
    let prompt = document.querySelector('.inputMessage')
    let submitButton = document.querySelector('.sendBtn')

    submitButton.addEventListener('click', ()=>{
        addMessageToMessagesArray({
            author : "User",
            content:prompt.value
        })
        displayMessages()
        content : prompt.value = "";



        askIa(prompt.value).then((data) => {
            console.log(data)
            addMessageToMessagesArray({
                author : "Felix",
                content:data,
            })
            displayMessages()
        })

    })
}

async function askIa(prompt)
{
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            prompt: prompt,
        })
    }
    return await fetch('https://felix.esdlyon.dev/ollama', params)
        .then(response => response.json())
        .then((json) => {
            console.log(json)
            return json.message
        })
}

function addMessageToMessagesArray(message)
{
    messages.push(message)
}

function displayChat(){
    chatPage.style.display = 'block'
    loginPage.style.display = 'none'

    displayMessages()
    handlePrompt()

}



if(!token){
    displayLoginForm()
}else{
    displayChat()
    displayMessages()
}
