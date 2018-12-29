// pass main and article to JS objects
const main = document.querySelector('main')
const article = document.querySelector('article')
const aside = document.querySelector('aside')

let obj = {} // object for holding all the blog words as keys

const cloudDiv = document.createElement('div');
cloudDiv.style.cssText = "background-color:rgb(161, 89, 87); padding:1rem; margin:1rem; min-height:400px; text-align:center; border-radius: 15px; border: 1px solid #000; box-shadow: 2px 2px 2px #333 inset";
aside.appendChild(cloudDiv)

// add cloud box to aside as first child
const cloudBox = document.createElement('div')
cloudBox.textContent = 'Word Cloudify Wonder Widget Appears Here'
cloudBox.classList.add("cloudBox");
cloudDiv.appendChild(cloudBox);

// label the slider out/slider 
const sliderLabel = document.createElement('p');
sliderLabel.style = "display:inline-block; font-size:1rem";
sliderLabel.innerHTML = "min: ";
cloudDiv.appendChild(sliderLabel);

// output tag to display the slider value as it changes
const sliderOut = document.createElement('output')
sliderOut.style.cssText = "padding:5px 15px; margin: 0 10px; text-align:center; font-weight:bold; font-size:1.5rem; border-radius:10px; border:2px solid #555";
cloudDiv.appendChild(sliderOut);

// set the default starter word freq : the min for word cloud inclusion
let minWordFreq = 7;

// slider to appear under the word cloud. On change, it re-renders the cloud
const slider = document.createElement('input')
slider.type = 'range'
slider.min = 2
slider.max = 12
slider.value = minWordFreq;
slider.addEventListener('change', renderCloud);
slider.addEventListener('input', function() {
    sliderOut.value = slider.value;
})
cloudDiv.appendChild(slider)

sliderOut.value = minWordFreq; // start the slider output w/ the starter slider value

// declare vars that you need for the word cloud application: you need an object to hold the blog word map and a string to hold the concatenated word cloud

let junk = "I a about abreast across addition adjust adjusted adjusting adjusts after again against ago almost along already also although always am among amount amounts an and another answer answered answering answers any anyone anything are arent aren't arrive arrived arriving arrives around article as aside ask asked aspect aspects at ave avenue away b back backs bad be became because been before behind being beside besides better best between big bigger biggest blah both bother but by c cab called came can cannot can't cant cancel certain certainly clear close closer complete completed complelely completes conclude concludes conclusion conclusions could couldn't couldnt corner couple course cover covered covering covers d delete deleted deletes despite detail detailed detailing details did didn't didnt do does  doing done don't dont double down downward during e each either else end ends enough entire entirely especially etc even every everyday example except exception f far feel felt feet few file first five fold folder follow followed following follows foot for forward foreward forewards form formed found four from front g gal gals gave gee get gets getting give given go goes going gone good goods got great guy guys h had hadnt haha half halves has have having he heard hello help her him himself his hola hour hours how however hundred hundreds i if img in include included including includes indeed inform information informational informed informing informs insofar instant instantly instants instance instead into is isn't isnt issue issues it its it's inward j jk just k keep keeping keeps kind knew know known knows l last lasts late later latest least leave left less lesser let like likes liked likely likelihood line list lists listed listing little lol look looked looking looks loose loosely low lower lowest long longer longest lot lots m made main make many matter mattered matters maybe me mean mere merely mine minute minutes miss missed misses missing mistake mistakes moment momentarily moments month months more moreover most much must my myself name n named namely names nay near nearly need needed needs neither never next no nobody none nope nor not nothing now o obtain obtained obtaining obtains occur occurs occurred of off often ok okay omg omit on once one oneself only oops open opened opens or other others our ours ourselves out outward over p part pass passed passing past percent percentage percents perhaps place places placed point points presence present probable probably pull pulled pulling pulls pure purely pursue pursed pursues pursuing q quite r rather remember remembered remembers reply replied replies require required requires requiring rest rested resting rests right round s said same sat saw say saying says second secondly seconds see seem seems seemed seemingly seeing sees service services set sets self several shall she shift shifts short shorter shortest shortly should side sides similar simple simply since sincerely small smaller smallest shm so some something sometimes soon sort special specially src st stay stayed staying stays still stood stop stopping stops stopped style styled styling styles such sudden suddenly sum summation suppose supposed supposedly supposes supposing t take taken takes taking tel tell telling tells than thank thanks that their them themselves then there these they theyre they're think thinking thinks this those though thought thousand thousands three threes through throughout thus to too took toward towards ttyl turn turns turned turning tries try two twos u under until up upon upward upwards us use used user using usually utterly v various very w want wants was way ways we week weeks well went were what when where whether which while within who who's whose why will with without worse worst would wouldnt wouldn't w www x y year years yes yet yo you your yours yourself yourselves z zip";
        
// array of all blog words, each word an array item
let str = document.querySelector('article').innerText;
let arr = str.split(' ');

// for-loop to iterate array of all blog words
for(let i = 0; i < arr.length; i++) {
    // simplify cloudObj[wordArr[i]], so that we don't have to work with nested square brackets [[]]
    let word = arr[i];
    
    // use RegEx to remove all non-letters from word
    word = word.replace(/[^\'a-z]+/gi, ""); // /[^\'a-z]+/ means not an apostrophe or a letter
    
    // if word already exists as obj key, push its index; else new key w array as value
    !obj[word] ? obj[word] = [i] : obj[word].push(i); // make it and add index as array item : add index to existing array
}
console.log(obj);

function renderCloud() {
    let cloud = ""; // the cloud we make to output to cloud box
    if(event) { // if this func got called by an event
        minWordFreq = event.target.value; // set the var to the minWordFreq
    }  
    // for-in loop to iterate object keys
    for(let key in obj) {
        if(obj[key].length > minWordFreq) {
            if(!junk.includes(key.toLowerCase())) { // If it's not a junk word
                let fontSize = Math.min(48, obj[key].length * 4);
                let redColor = Math.min(255, obj[key].length * 20);
                let color = `rgb(${redColor}, 88, 88)`;
                cloud += `<span style="font-size:${fontSize}px; color:${color}">${key}&nbsp;</span>`;
            } 
        }
    }
    cloudBox.innerHTML = cloud;
}
renderCloud() // load the initial word cloud on page load using default minWordFreq value
