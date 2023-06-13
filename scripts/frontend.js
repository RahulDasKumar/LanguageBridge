let commentSectionCSS = ['style-scope ytd-comment-renderer', 'style-scope yt-formatted-string', 'style-scope ytd-expander']
let port = chrome.runtime.connect({ name: "translate" });
var isLoaded = false

const popupCreator = () =>{
    //creating elements
    const pop = document.createElement('div');
    const commentHolder = document.createElement('div')
    const originalComment = document.createElement('p')
    const translatedCommentHolder = document.createElement('div')
    const translatedComment = document.createElement('p')
    const title = document.createElement('h3')
    // adding attributes
    pop.className = 'popup';
    pop.id = 'popID'
    translatedComment.id = 'translatedText'
    originalComment.id = 'originalComment'
    // adding default texts
    title.textContent = 'Translate youtube comments!'
    //appending to elements
    commentHolder.appendChild(originalComment)
    translatedCommentHolder.appendChild(translatedComment)
    pop.append(title,commentHolder,translatedCommentHolder)
    return pop
}


const makeButton = async () => {
    await sleep(300)
if (document.getElementById('center') != null) {
    const header = document.getElementById('center')
    isLoaded = true
    console.log(header) // sees if the header is not null
    const container = document.createElement('div');
    const translator = document.createElement('div');
    const pop = popupCreator();
    container.className = "container";
    translator.className = 'edge-effect';
    translator.textContent = 'Translate'
    translator.id = 'translate-button'
    container.append(translator, pop);
    header.appendChild(container);
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

async function getTranslateElement(){
    await sleep(3000)
    console.log(isLoaded)
    if(isLoaded === false){
        makeButton();
    }
    if(isLoaded === true){
    document.getElementById('translate-button').addEventListener('click', () => {

    })
}
}


window.addEventListener('click', (event) => {
    console.log(event)
    const originalCommentHolder = document.getElementById('originalComment')
    let commentText = '';
    if (event.target.className.includes(commentSectionCSS[0]) ||
        event.target.className.includes(commentSectionCSS[1])) {
        commentText = event.target.innerText
        console.log(commentText)
        originalCommentHolder.textContent = ''
        originalCommentHolder.textContent = commentText
        port.postMessage({ action: commentText });
    }
})
//gets message from the background text
port.onMessage.addListener((msg)=>{
    console.log(msg.translatedText)
    const translatedText = document.getElementById('translatedText');
    translatedText.textContent = ''
    translatedText.textContent = 'msg.translatedText'
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

makeButton();

handleDisconnect();


getTranslateElement();
