class WordCloudify {
    constructor(str, app) {
        this.app = document.getElementById(app); // where to dump widget
        this.app.innerHTML = '';
        this.str = str; // str to cloudify
        this.obj = {}; // obj for holding all unique blog words as keys
        this.min = 5; // the min freq of word to be included in word cloud

        this.cloudDiv = document.createElement('div');
        this.cloudDiv.style.cssText = "background-color:rgb(138, 138, 138); padding:1rem; margin:1rem; min-height:400px; text-align:center; border-radius: 15px; border: 1px solid #000; box-shadow: 2px 2px 2px #333 inset";
        this.app.appendChild(this.cloudDiv)

        // add cloud box to aside as first child
        this.cloudBox = document.createElement('div');
        this.cloudBox.textContent = 'Word Cloudify Wonder Widget Appears Here'
        this.cloudBox.classList.add("cloudBox");
        this.cloudDiv.appendChild(this.cloudBox);

        // label the slider out/slider 
        this.sliderLabel = document.createElement('p');
        this.sliderLabel.style = "display:inline-block; font-size:1rem; margin:0; position: relative; bottom: 6px";
        this.sliderLabel.innerHTML = "Min Word Freq: ";
        this.cloudDiv.appendChild(this.sliderLabel);

        // output tag to display the slider value as it changes
        this.sliderOut = document.createElement('output')
        this.sliderOut.style.cssText = "padding:3px 13px; margin: 0 2.5em 0 10px; text-align:center; font-weight:bold; font-size:1.3rem; border-radius:10px; border:2px solid #555; position: relative; bottom: 6px";
        this.cloudDiv.appendChild(this.sliderOut);

        // slider to appear under the word cloud. On change, it re-renders the cloud
        this.slider = document.createElement('input')
        this.slider.type = 'range'
        this.slider.min = 2
        this.slider.max = 12
        this.slider.value = this.min;
        this.slider.cssText = "position: relative; top:15px";
        this.slider.addEventListener('change', this.renderCloud.bind(this));
        this.slider.addEventListener('input', () => {
            this.sliderOut.value = this.slider.value;
        })
        this.cloudDiv.appendChild(this.slider)

        this.sliderOut.value = this.min; // start the slider output w/ the starter slider value
        
        this.minLabel = document.createElement('label');
        this.minLabel.innerHTML = `${this.slider.min}`;
        this.minLabel.cssText = "margin-right:8px";
        this.cloudDiv.insertBefore(this.minLabel, this.slider);
        
        this.maxLabel = document.createElement('label');
        this.maxLabel.innerHTML = `${this.slider.max}`;
        this.cloudDiv.appendChild(this.maxLabel);

        this.junk = "I a about abreast across addition adjust adjusted adjusting adjusts after again against ago almost along already also although always am among amount amounts an and another answer answered answering answers any anyone anything are arent aren't arrive arrived arriving arrives around article as aside ask asked aspect aspects at ave avenue away b back backs bad be became because been before behind being beside besides better best between big bigger biggest blah both bother but by c cab called came can cannot can't cant cancel certain certainly clear close closer complete completed complelely completes conclude concludes conclusion conclusions could couldn't couldnt corner couple course cover covered covering covers d delete deleted deletes despite detail detailed detailing details did didn't didnt do does  doing done don't dont double down downward during e each either else end ends enough entire entirely especially etc even every everyday example except exception f far feel felt feet few file first five fold folder follow followed following follows foot for forward foreward forewards form formed found four from front g gal gals gave gee get gets getting give given go goes going gone good goods got great guy guys h had hadnt haha half halves has have having he heard hello help her him himself his hola hour hours how however hundred hundreds i if img in include included including includes indeed inform information informational informed informing informs insofar instant instantly instants instance instead into is isn't isnt issue issues it its it's inward j jk just k keep keeping keeps kind knew know known knows l last lasts late later latest least leave left less lesser let like likes liked likely likelihood line list lists listed listing little lol look looked looking looks loose loosely low lower lowest long longer longest lot lots m made main make many matter mattered matters maybe me mean mere merely mine minute minutes miss missed misses missing mistake mistakes moment momentarily moments month months more moreover most much must my myself name n named namely names nay near nearly need needed needs neither never next no nobody none nope nor not nothing now o obtain obtained obtaining obtains occur occurs occurred of off often ok okay omg omit on once one oneself only oops open opened opens or other others our ours ourselves out outward over p part pass passed passing past percent percentage percents perhaps place places placed point points presence present probable probably pull pulled pulling pulls pure purely pursue pursed pursues pursuing q quite r rather remember remembered remembers reply replied replies require required requires requiring rest rested resting rests right round s said same sat saw say saying says second secondly seconds see seem seems seemed seemingly seeing sees service services set sets self several shall she shift shifts short shorter shortest shortly should side sides similar simple simply since sincerely small smaller smallest shm so some something sometimes soon sort special specially src st stay stayed staying stays still stood stop stopping stops stopped style styled styling styles such sudden suddenly sum summation suppose supposed supposedly supposes supposing t take taken takes taking tel tell telling tells than thank thanks that their them themselves then there these they theyre they're think thinking thinks this those though thought thousand thousands three threes through throughout thus to too took toward towards ttyl turn turns turned turning tries try two twos u under until up upon upward upwards us use used user using usually utterly v various very w want wants was way ways we week weeks well went were what when where whether which while within who who's whose why will with without worse worst would wouldnt wouldn't w www x y year years yes yet yo you your yours yourself yourselves z zip";

        let arr = str.split(' ');

        // for-loop to iterate array of all blog words
        for(let i = 0; i < arr.length; i++) {
            // simplify cloudObj[wordArr[i]], so that we don't have to work with nested square brackets [[]]
            let word = arr[i];

            // use RegEx to remove all non-letters from word
            word = word.replace(/[^\'a-z]+/gi, ""); // /[^\'a-z]+/ means not an apostrophe or a letter

            // if word already exists as obj key, push its index; else new key w array as value
            !this.obj[word] ? this.obj[word] = [i] : this.obj[word].push(i);
        }
        this.renderCloud()
    }
    
    renderCloud() {
        let cloud = ""; // the cloud we make to output to cloud box
        if(event) { // if this func got called by an event
            this.min = event.target.value; // set the var to the minWordFreq
        }  
        // for-in loop to iterate object keys
        for(let key in this.obj) {
            if(this.obj[key].length > this.min) {
                if(!this.junk.includes(key.toLowerCase())) { // If it's not a junk word
                    let fontSize = Math.min(48, this.obj[key].length * 4);
                    let redColor = Math.min(255, this.obj[key].length * 20);
                    let color = `rgb(${redColor}, 88, 88)`;
                    cloud += `<span style="font-size:${fontSize}px; color:${color}">${key}&nbsp;</span>`;
                } 
            }
        }
        this.cloudBox.innerHTML = cloud;
    }
}
