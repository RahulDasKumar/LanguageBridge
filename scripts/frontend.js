const array = ['style-scope ytd-comment-renderer', 'style-scope yt-formatted-string', 'style-scope ytd-expander']
var commentText = ''
let port = chrome.runtime.connect({ name: "translate" });




const makeButton = async () => {
    await sleep(300)
if (document.getElementById('center') != null) {
    const header = document.getElementById('center')
    console.log(header) // sees if the header is not null
    const container = document.createElement('div');
    const translator = document.createElement('div');
    const pop = document.createElement('div');
    container.className = "container";
    translator.className = 'edge-effect';
    translator.textContent = 'Translate'
    pop.className = 'popup';
    container.append(translator, pop);
    header.appendChild(container);
    console.log(header) //sees if the container is loaded with proper DOM elements
}
    document.querySelector('.edge-effect').addEventListener('click', function () {
        var popup = document.querySelector('.popup');
        console.log('running')
        popup.classList.toggle('active');
    });
}

function sleep(time){
    return new Promise(resolve=>{
        setTimeout(resolve(console.log(`you have waited ${time} milliseconds`)),time)
    })
}




window.addEventListener('click', (event) => {
    console.log(event)
    if (event.target.className.includes(array[0]) ||
        event.target.className.includes(array[1])) {
        commentText = event.target.innerText
        console.log(commentText)
        port.postMessage({ action: commentText });
    }
})


function handleDisconnect() {
    port.onDisconnect.addListener(async () => {
        console.log("it disconnected again")
        await sleep(1000);
        port = null;
        port = await chrome.runtime.connect({ name: "translate" });
        console.log(port);
        handleDisconnect(); 
    });
}

handleDisconnect();


