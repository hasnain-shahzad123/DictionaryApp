//starting my code for dictionary app  here 
let searchBtn=document.querySelector('.btn')
let word=document.querySelector('.inputTag')
let parentDiv=document.querySelector('.main')
let div=document.createElement('div')
alert("You can search the word by speacking after clicking the button 'Turn On'")
let searchButtonClicked=false;

const focusfun=(event)=>{
    event.style.backgroundColor='yellowgreen';
}
const blurfun=(event)=>{
    event.style.backgroundColor=""
}

async function eventCalled(word){
    word.placeholder='wait searching your word'
 let response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  let data=await response.json()
  console.log(typeof data)
    div.classList.add('mainData')
    const partOfSpeech = (data?.[0]?.meanings?.[1]?.partOfSpeech) || " ";
    const synonymNext=(data?.[0]?.meanings?.[0]?.synonyms?.[1]) || " ";
    const antonyme=(data?.[0]?.meanings?.[0].antonyms?.[0]) ||
    (data?.[0]?.meanings?.[0].antonyms?.[0])||
    (data?.[0]?.meanings?.[1]?.antonyms?.[0])|| 
    (data?.[1]?.meanings?.[0]?.antonyms?.[0])||
    (data?.[1]?.meanings?.[1]?.antonyms?.[0])||
    (data?.[1]?.meanings?.[2]?.antonyms?.[0])|| 
    (data?.[2]?.meanings?.[0]?.antonyms?.[0])||
    (data?.[2]?.meanings?.[1]?.antonyms?.[0])||
    (data?.[3]?.meanings?.[1]?.antonyms?.[0])||
    (data?.[3]?.meanings?.[0]?.antonyms?.[0])|| "Antonym Not found"
    let firstSynonym=(data?.[0].meanings?.[0].synonyms?.[0]) || "Synonym Not found"
    div.innerHTML=`
        <h2>Word: ${word}</h2>
        <h3>Meaning:${data[0].meanings[0].definitions[0].definition} </h3>
        <h1>More Info About Word</h1>
        <p>Part of speech: ${data[0].meanings[0].partOfSpeech}, ${partOfSpeech}</p>
        <p>Antonym: ${antonyme}</p>
        <p>Synonym: ${firstSynonym},${synonymNext}</p>
    `
    parentDiv.appendChild(div);
    document.querySelector('.inputTag').value=''
    document.querySelector('.inputTag').placeholder='search here manually'
}



eventCalled("Shaikh");
searchBtn.addEventListener('click',function(){
    button.style.backgroundColor='';
    //document.querySelector('.inputTag').placeholder='Wait searching your word'
    searchButtonClicked=true;
    if(word.value==""){
        alert("Please Enter a word and then Proceed further")
    }
    else{      
    eventCalled(word.value);
    
    }
   
})
let clicked=false;
let button=document.querySelector('.btn1');
const recongnitionClicked=()=>{
    let a=0;
    let interval=setInterval(()=>{
        if(a<=4)
        {
            document.querySelector('.inputTag').placeholder='Wait Recognizing'
            //a++;
        }
        else{
            document.querySelector('.inputTag').placeholder='Speak Something...'
            clearInterval(interval);
        }
        a++;
    },1000)
   
        button.style.backgroundColor='#c0392b'
        let recognition=new webkitSpeechRecognition();
        recognition.start();
    recognition.lang='en-GB'
    recognition.onresult=function(event)
    {
            let  val=event.results[0][0].transcript;
            document.querySelector('.inputTag').value=val;
       
        setTimeout(()=>{
            if(!searchButtonClicked){
            let res=confirm("Do you want to search " + val)
            if(res){
                button.style.backgroundColor='';
                eventCalled(val)
            }
            else{
                document.querySelector('.inputTag').value='';
                document.querySelector('.inputTag').placeholder='search manually here'
            } 
        }
        },5000)
        searchButtonClicked=false;
    }
    }
