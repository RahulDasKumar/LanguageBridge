//const config = require('../config.json')
const languageAcronymsn = {
    
}

async function getAPIKey(){
    const configURL = chrome.runtime.getURL('../config.json')
    const response = await fetch(configURL)
    const jsonData = await response.json();
    return jsonData.API_Key
}


//const fetch = require("node-fetch")


async function translate(){
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': await getAPIKey(),
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: 'Hello, world!',
            target: 'zh-CN',
            source: 'en'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

translate()


console.log("Hello Youtube!");
