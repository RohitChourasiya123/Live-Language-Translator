let langOption = document.querySelectorAll('select');
let fromtext = document.querySelector('.fromtext');
let transText = document.querySelector('.toTranslate');
let fromVoice= document.querySelector('.from ');
let tovoice= document.querySelector('.to');
let cpybtn= document.querySelector('.bx-copy');
let countvalue= document.querySelector('.codelength');

langOption.forEach((get, con) => {
    for (let countryCode in language) {

        let selected;
        if (con == 0 && countryCode == "en-GB") {
            selected = "selected";
        } else if (con == 1 && countryCode == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        get.insertAdjacentHTML('beforeend', option);

    }
})
fromtext.addEventListener('input', function () {
    let content = fromtext.value;
    fromContent = langOption[0].value;
    transContent = langOption[1].value;

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

    fetch(transLINK).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText;
    })
})

fromVoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk= new SpeechSynthesisUtterance(fromtext.value);
    fromtalk.lang= langOption[0].value;
    speechSynthesis.speak(fromtalk)
})

tovoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk= new SpeechSynthesisUtterance(transText.value);
    fromtalk.lang= langOption[0].value;
    speechSynthesis.speak(fromtalk)
})
cpybtn.addEventListener('click',function(){
    navigator.clipboard.writeText(transText.value);
})
fromtext.addEventListener('keyup',function(){
    countvalue.innerHTML=`${fromtext.value.length}/5,000`;
})