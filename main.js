
function get_translation_settings(text, source_lang, target_lang) {
    let API_KEY = "AIzaSyDGv6qA76uai1DPK0uAUl6OOe3av_nhW1Q"
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
        },
        "data": {
            "q": text,
            "target": target_lang,
            "source": "en"
        }
    };
    return settings;
}


// Let's first check if the extension is enabled.
chrome.storage.local.get(['isEnabled', 'selectedLanguage'], data => {
    let selectedLanguage = data.selectedLanguage;
    console.log(selectedLanguage);
    if (data.isEnabled) {
        // Let's find the web page's language and run the script if it's English.
        let lang = document.getElementsByTagName('html')[0].getAttribute('lang');
        lang = lang.substring(0, 2);
        if (lang == "en") {
            let translations = [];

            let paragraphs = document.body.getElementsByTagName("p");
            // console.log(paragraphs);

            let paragraphsSize = paragraphs.length;

            for (let i = 0; i < paragraphsSize; i++) {
                let p = paragraphs[i];
                let pText = p.innerText;
                // console.log(pText);

                let tokenizedText = pText.split(" ")
                // console.log(tokenizedText);
                let numberOfHighlightedWords = Math.floor(tokenizedText.length * 0.1);

                let randomIndexes = [];
                for (let j = 0; j < numberOfHighlightedWords; j++) {
                    let randomIndex = Math.floor(Math.random() * tokenizedText.length);
                    randomIndexes.push(randomIndex);
                }

                if (i < 20) {
                    for (let j = 0; j < randomIndexes.length; j++) {
                        let randomWordInParagraph = tokenizedText[randomIndexes[j]];
                        console.log(randomWordInParagraph);
                        let translation = "test";


                        if (randomWordInParagraph.length > 2 && /^[a-zA-Z]+$/.test(randomWordInParagraph)) {
                            $.ajax(get_translation_settings(randomWordInParagraph, "en", selectedLanguage)).done(function (response) {
                                translations.push(response.data.translations[0].translatedText);
                                translation = response.data.translations[0].translatedText;
                                console.log(randomWordInParagraph);
                                console.log(translation);
                                pText = pText.replace(randomWordInParagraph, `<div class='langblend' style="background-color: #D6E5FA; display: inline-block; cursor:pointer" id=${translation.split(' ') + i + j}>${translation}<span id=${translation.split(' ') + i + j + 'tooltip'} style="position: absolute; background-color: rgb(255, 255, 255); color: rgb(50, 50, 50); width: 200px; height: 135px; text-align: center; visibility: hidden; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; border: 1px rgb(50, 50, 50); border-radius: 5px"><div style="height: 20px; display: flex; justify-content: right; padding: 10px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fbabb5" class="bi bi-bookmark-check" viewBox="0 0 16 16" style="cursor:pointer"><path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg></div><div style="display: flex; flex-direction: column; row-gap: 5px; justify-content: left; align-items: flex-start; padding: 10px; border-bottom: 1px solid #fbabb5; height: 30px; font-size:20px"><div>${randomWordInParagraph}</div></div><div style="display: flex; justify-content: space-between; padding: 10px"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fbabb5" class="bi bi-gear-fill" viewBox="0 0 16 16" style="cursor:pointer"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/></svg></div></span></div>`)
                                p.innerHTML = pText;
                            });
                        }
                    }
                }
            }


            document.onmouseover = function (e) {

                if (document.getElementById(e.target.id + 'tooltip')) {
                    document.getElementById(e.target.id + 'tooltip').style.visibility = 'visible';
                    if (window.innerWidth - e.clientX < 300) {
                        document.getElementById(e.target.id + 'tooltip').style.marginRight = "10px";
                        document.getElementById(e.target.id + 'tooltip').style.right = window.innerWidth - e.clientX + "px";
                    } else {
                        document.getElementById(e.target.id + 'tooltip').style.marginLeft = "10px";
                    }
                }
                setTimeout(() => {
                    if (document.getElementById(e.target.id + 'tooltip')) {
                        document.getElementById(e.target.id + 'tooltip').style.visibility = 'hidden';
                    }
                }, "5000")
            }

            document.onmouseout = function (e) {
                if (e.target.id.includes("tooltip")) {
                    console.log("tooltip mouse over");
                }
                else {
                    document.getElementById(e.target.id + 'tooltip').style.visibility = 'hidden';
                }
            }

        }
    }
});
