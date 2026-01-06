/* adapted with thanks from https://www.4rknova.com/blog/2025/01/16/speech-synthesis */
const splitText = (text) => {
    // split text into sentences
    return text.split('. ');
}

const generateTranscript = () => {
    let transcript = [];  
    const content = document.querySelectorAll(".content");
      
    content.forEach((elem) => {
        elem.querySelectorAll("*").forEach((c) => {
            // This regex will match all header tags
            const re = new RegExp("h([1-6])[^>]*");
            const tagName = c.tagName.toString().toLowerCase();
            const text = c.innerText;

            if (!text) {
                return;
            }
            
            if (re.test(tagName)) {
                // Skip if marked specifically to be ignored
                if (!c.parentElement.classList.contains("noreadaloud")) {
                    const sentences = splitText(text);
                    transcript.push(...sentences);
                }
            }
            else
            {
                switch (tagName) {
                    case 'p':
                    case 'li': {
                        const sentences = splitText(text);
                        transcript.push(...sentences);
                        break;
                    }
                    case 'img': {
                        if (c.alt === "") {
                            transcript.push("Media included, image with no description");
                        } else {
                            transcript.push("Media included: " + c.alt + "\n");
                        }
                        break;
                    }
                    case 'code': {
                        // nothing
                        break;
                    }
                    case 'pre': {
                        transcript.push("Ignoring code section - cannot read it out loud.\n");
                        break;
                    }
                    case 'div': {
                        if (c.classList.contains("notice")) {
                            transcript.push("Please note: ");
                        }
                        break;
                    }
                    default:
                        console.log("Narrator: ignoring tag " + tagName);
                    }
            }
        });
    });
    return transcript.filter(function(entry) { return entry.trim() != ''; });
}

async function playTranscript(transcript){
    for (let i = 0; (i < transcript.length); i++ ){
        await playSegment(transcript[i])
    }
}
 
async function playSegment( segment ){
    return new Promise( resolve =>{
        let synthesis = window.speechSynthesis;
        synthesis.cancel();
        let ssu = new SpeechSynthesisUtterance();
        ssu.rate = 0.9;
 
        console.log("Narrator: " + segment);
        ssu.text = segment;
        synthesis.speak(ssu);
        ssu.onend = resolve;
    })
}

const narrationButton = document.querySelector(".narrator");
const defaultTabTitle = document.title;

window.addEventListener("load", () => {
    const isSynthAvailable = window.speechSynthesis !== undefined;
    if (!isSynthAvailable) {
        narrationButton.style.display = "none";
    }
});

// stop audio when user navigates away from the page
window.addEventListener("beforeunload", () => {
    window.speechSynthesis.cancel();
});

// change title of the tab when audio is playing (to show that audio is playing)
window.setInterval(() => {
    if (window.speechSynthesis.speaking) {
        document.title = "[🔊] " + defaultTabTitle;
        narrationButton.classList.add("narrator-active");
    } else {
        document.title = defaultTabTitle;
        narrationButton.classList.remove("narrator-active");
    }
}, 500);

narrationButton.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    } else {
        const text = generateTranscript();
        playTranscript(text);
    }
});
