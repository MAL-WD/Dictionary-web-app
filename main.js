const wordinfo=document.getElementById("word-info")
const wordmeanings=document.querySelector(".word-meaning")
const btn=document.getElementById("search")
const sound=document.getElementById("sound")
let info=document.querySelector(".info")
let iAudio=document.querySelector(".voice i");
let audio;
let source=document.querySelector(".source")
let sourceSpan=document.querySelector(".source a")
function data(result,word){
    if (result.title) {
        wordinfo.style.display="none" 
        info.style.display="block"    
        source.classList.remove("flex")

        info.innerHTML=`<img src="images/download.png" alt="" srcset="">
        <h3>No Definitions Found</h3>
        <p>Sorry pal, we couldn't find definitions for <span>"${word}"</span>.You can try to search to another word instead.</p>`
    }
    else{
        console.log(result)
        wordinfo.style.display="block"        
        info.style.display="none"       

        document.querySelector(".The-word h1").innerHTML=result[0].word
        for (let i = 0; i < result[0].phonetics.length; i++) {
            if(result[0].phonetics[i].audio!=''){
                
                audio= new Audio(result[0].phonetics[i].audio)
                break;
            }
            
        }
        if(result[0].phonetic!=undefined)
        
            document.querySelector(".The-word span").innerHTML=result[0].phonetic
        else
            document.querySelector(".The-word span").innerHTML=result[0].phonetics[1].text
        wordinfo.classList.remove("none")
        info.classList.add("none")
        
        source.classList.add("flex")
        sourceSpan.setAttribute("href",`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        sourceSpan.setAttribute("target","_blank")
        sourceSpan.innerHTML=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        for (let i = 0; i < result[0].meanings.length; i++) {
            let defitions =result[0].meanings[i].definitions
            let defitionsUl =document.querySelector(".definitions")
            let meaning= `<div class="meaning">
            <div class="type"><h2>${result[0].meanings[i].partOfSpeech}</h2><span></span></div>
            
            <h3>Meaning</h3>
            <ul class="definitions">
            
            
            
            </ul>
            <p class="example"></p>
            <div class="synonymes"> <h3>Synonymes</h3></div>
            

        </div>`
        wordmeanings.insertAdjacentHTML("beforeend",meaning)
        if (result[0].meanings[i].definitions.length<5) {
            for (let j = 0; j < result[0].meanings[i].definitions.length; j++) {
                let definition=`<li>${result[0].meanings[i].definitions[j].definition}</li>`
                let defintionul= document.querySelector(".word-meaning div:last-child ul")
                defintionul.insertAdjacentHTML("beforeend",definition)
            }   
        } else{
            for (let j = 0; j < 3; j++) {
                let definition=`<li>${result[0].meanings[i].definitions[j].definition}</li>`
                let defintionul= document.querySelector(".word-meaning div:last-child ul")
                defintionul.insertAdjacentHTML("beforeend",definition)
            }   
            
        }
        let synonymes= document.querySelectorAll(".synonymes")
        if (result[0].meanings[i].synonyms.length==0) {
            synonymes[i].style.display="none"
        } else if(result[0].meanings[i].synonyms.length>4){
            
            for (let j = 0; j < 5; j++) {
                let span= `<span>${result[0].meanings[i].synonyms[j]}</span>`
                synonymes[i].insertAdjacentHTML("beforeend",span)
            }
        }
        else{
            for (let j = 0; j < result[0].meanings[i].synonyms.length; j++) {
                let span= `<span>${result[0].meanings[i].synonyms[j]}</span>`
                synonymes[i].insertAdjacentHTML("beforeend",span)
            }
            
        }
        if(result[0].meanings[i].definitions[0].example!==undefined){
            document.querySelector(".example").innerHTML=`"${result[0].meanings[i].definitions[0].example}"`
        }
        }
    }
    }
function fetchapi(word) {
    info.innerHTML=`Searching for the meaning of <span>"${word}"</span>`
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then((response)=>response.json()).then(result=>data(result,word))

}
btn.addEventListener("click",()=>{
    let inpword= document.getElementById("inpword").value
    wordmeanings.innerHTML=""
    fetchapi(inpword)
   
    

    
})
// fonts
let fontIcon=document.querySelector(".font-family i");
let fontUl=document.querySelector(".font")
fontIcon.addEventListener("click",()=>{
    if (fontIcon.classList.contains("false")) {
        fontUl.style.display="block"
        fontIcon.style.transform="rotate(180deg)"
        fontIcon.classList.remove("false")
        fontIcon.classList.add("true")
    }else{
        fontUl.style.display="none"
        fontIcon.style.transform="rotate(0deg)"
        fontIcon.classList.remove("true")
        fontIcon.classList.add("false")
        
    }
})

let fontLis=document.querySelectorAll(".font li")
console.log(fontLis)
function active(e) {
    console.log(e.target.parentElement)
    e.target.parentElement.querySelectorAll(".active").forEach(e=>{
        e.classList.remove("active")
    })
    e.target.classList.add("active")
}
fontLis.forEach(li=>li.addEventListener("click",(e)=>{
    let span =document.querySelector(".font-family span")
    if (li.classList.contains("serif")) {
        document.body.style.fontFamily="'Roboto', sans-serif"
        span.innerHTML="Serif"
    }
    else if (li.classList.contains("sans")) {
        document.body.style.fontFamily="'Fraunces', serif"
        span.innerHTML="Sans-Serif"
    }
    else  {
        document.body.style.fontFamily="'IBM Plex Mono', monospace";
        span.innerHTML="Monoscape"
    }
    active(e)
}))
// dark Mode
function darkMode(){
    let root=document.querySelector(":root")
    var inputDark=document.querySelector(".darkInput")
    var inputword=document.querySelector("form input")
    var header =document.querySelector("header");
    let voice= document.querySelector(".voice")
    if (inputDark.checked==true) {
        document.body.classList.add("darkmode")
        voice.style.color="#9f39ff"
        voice.style.backgroundColor="#4a2f65"
        // 
        // document.body.style.backgroundColor="black"
        // header.style.backgroundColor="black"
        inputword.style.backgroundColor="#212121"
        document.querySelector(".type span").style.backgroundColor="#333"
        document.querySelector(".font").style.boxShadow="0 0 15px 0 #212121"
    }
    else{
        document.body.classList.remove("darkmode")
        // document.body.style.backgroundColor="white"
        inputword.style.backgroundColor="#eee"
        document.querySelector(".font").style.boxShadow="0 0 15px 0 #ddd"
        document.querySelector(".type span").style.backgroundColor="#eee"
        // header.style.backgroundColor="white"
        voice.style.backgroundColor="#c9a1ef"
        voice.style.color="var(--first-color)"

    }
}
// audio 
iAudio.addEventListener("click",()=>{
    audio.play();
})
