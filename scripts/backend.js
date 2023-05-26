//const config = require('../config.json')
//const fetch = require("node-fetch");

const language_detect = {
    "Auto Detect": "auto", "Afrikaans": "af", "Albanian": "sq", "Amharic": "am", "Arabic": "ar",
    "Armenian": "hy", "Azerbaijani": "az", "Basque": "eu", "Belarusian": "be", "Bengali": "bn", "Bosnian": "bs", "Bulgarian": "bg", "Catalan": "ca", "Cebuano": "ceb", "Chinese (Simplified)": "zh-CN", "Chinese (Traditional)": "zh-TW", "Corsican": "co", "Croatian": "hr", "Czech": "cs", "Danish": "da", "Dutch": "nl", "English": "en", "Esperanto": "eo", "Estonian": "et", "Finnish": "fi", "French": "fr", "Frisian": "fy", "Galician": "gl", "Georgian": "ka", "German": "de", "Greek": "el", "Gujarati": "gu", "Haitian Creole": "ht", "Hausa": "ha", "Hawaiian": "haw", "Hebrew": "iw", "Hindi": "hi", "Hmong": "hmn", "Hungarian": "hu", "Icelandic": "is", "Igbo": "ig", "Indonesian": "id", "Irish": "ga", "Italian": "it", "Japanese": "ja", "Javanese": "jv", "Kannada": "kn", "Kazakh": "kk", "Khmer": "km", "Kinyarwanda": "rw", "Korean": "ko", "Kurdish (Kurmanji)": "ku", "Kurdish (Sorani)": "ckb", "Kyrgyz": "ky", "Lao": "lo","Latin": "la", "Latvian": "lv", "Lithuanian": "lt", "Luxembourgish": "lb", "Macedonian": "mk", "Malagasy": "mg", "Malay": "ms","Malayalam": "ml", "Maltese": "mt", "Maori": "mi", "Marathi": "mr", "Mongolian": "mn", "Myanmar (Burmese)": "my", "Nepali": "ne", "Norwegian": "no", "Nyanja (Chichewa)": "ny", "Odia (Oriya)": "or", "Pashto": "ps", "Persian": "fa", "Polish": "pl","Portuguese (Portugal, Brazil)": "pt", "Punjabi": "pa", "Romanian": "ro", "Russian": "ru", "Samoan": "sm", "Scots Gaelic": "gd", "Serbian": "sr", "Sesotho": "st", "Shona": "sn", "Sindhi": "sd", "Sinhala (Sinhalese)": "si", "Slovak": "sk", "Slovenian": "sl","Somali": "so", "Spanish": "es", "Sundanese": "su", "Swahili": "sw", "Swedish": "sv", "Tagalog (Filipino)": "tl", "Tajik": "tg","Tamil": "ta", "Tatar": "tt", "Telugu": "te", "Thai": "th", "Turkish": "tr", "Turkmen": "tk", "Ukrainian": "uk", "Urdu": "ur","Uyghur": "ug", "Uzbek": "uz", "Vietnamese": "vi", "Welsh": "cy", "Xhosa": "xh", "Yiddish": "yi", "Yoruba": "yo", "Zulu": "zu"
}

/*
Use this method when running in chrome
*/
async function getAPIKey(){
    const configURL = chrome.runtime.getURL('../config.json')
    const response = await fetch(configURL)
    const jsonData = await response.json();
    return jsonData.API_KEY
}


// returns language as a ascronym
async function detectLanguage(){
    const url = 'https://api.translateplus.io/v1/language_detect'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': await getAPIKey(),
        }
        ,
        body: JSON.stringify({ text: "Taro ke town me jaa kar kay karega vah to plasma hai" }),
        }
   

    try {
        const response = await fetch(url, options);
        const result = await response.json()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


//translate the word given, but language is needed to do proper translation.
async function Translate(text,target){
    const url = 'https://api.translateplus.io/v1/translate'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': await getAPIKey(),
        }
        ,
        body: JSON.stringify({ text: "Taro ke town me jaa kar kay karega vah to plasma hai",
        source:"auto",target:"en"}),
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}






chrome.runtime.onConnect.addListener( (port) => {
    console.assert(port.name === "translate");
    port.onMessage.addListener(function (msg) {
            console.log(msg.action)
    });
});
//Translate()




