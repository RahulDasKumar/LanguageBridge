
/*
add event listener that fires every time you click on a youtube comment
When clicked on a div that has a id named "comment-comment" 
it will extract the text content
*/

//get the event.targetinnerHTML
// filter out the comment by looking at thE event.target
// it should equal yt-formatted-string#content-text.style-scope.ytd-comment-renderer

//open port named translate

const array = ['style-scope ytd-comment-renderer','style-scope yt-formatted-string',]
var commentText = ''


var port = chrome.runtime.connect({ name: "translate" });

window.addEventListener('click',(event)=>{
    console.log(event)
    if (event.target.className.includes(array[0]) || event.target.className.includes(array[1])){
        //console.log(event.target.innerHTML)
        commentText = event.target.innerHTML
        console.log('The inner text is ' + commentText)
        port.postMessage({ action: commentText });
    }
    else
        console.log(event.target.innerHTML)
})







//var port = chrome.runtime.connect({ name: "knockknock" });
// port.postMessage({ joke: "Knock knock" });
// port.onMessage.addListener(function (msg) {
//     if (msg.question === "Who's there?"){
//         port.postMessage({ answer: "Madame" });
//         console.log(msg)
//     }
//     else if (msg.question === "Madame who?")
//         port.postMessage({ answer: "Madame... Bovary" });
// });

console.log("Im here")