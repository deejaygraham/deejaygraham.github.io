/* adapted with thanks from https://www.4rknova.com/blog/2025/01/16/speech-synthesis */
const narrationRatePreferenceKey = "narration-rate";
const narrationVoicePreferenceKey = "narration-voice";
const defaultNarrationRate = "0.8";
const supportedNarrationRates = new Set(["0.5", "0.8", "1", "1.25", "1.5", "2"]);

const getPreference = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const savePreference = (key, value) => {
  try {
    if (value) {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Narration still works when storage is unavailable.
  }
};

const splitText = (text) => {
    // split text into sentences
    return text.split('. ');
}

const pushText = (transcript, text) => {
  const trimmed = text?.trim();
  if (!trimmed) {
    return;
  }
  transcript.push(...splitText(trimmed).filter((part) => part.trim() !== ""));
};

const getArticleTitle = () => {
  const title = document.querySelector("main h1");
  return title?.innerText?.trim() || "";
};

const generateTranscript = () => {
    let foundCode = false;
    const transcript = [];  
    pushText(transcript, getArticleTitle());
    
    const nodeList = document.querySelectorAll(".site-prose");
    
    nodeList.forEach(node => {
        node.querySelectorAll("*").forEach((n) => {
            const tagName = n.tagName.toString().toLowerCase();
            const text = n.innerText;

            if (!text) {
                return;
            }
            
            switch (tagName) {
                case 'p':
                case 'li': 
                case 'figcaption': {
                    pushText(transcript, text);
                    break;
                }
                case 'img': {
                    if (n.alt === "") {
                        pushText(transcript, "Media included, image with no description");
                    } else {
                        pushText(transcript, "Media included: " + n.alt + "\n");
                    }
                    break;
                }
                case 'code': {
                    // nothing
                    break;
                }
                case 'pre': {
                    if (foundCode) {
                        // already seen some code so don't give full message again...
                        pushText(transcript, "Skipping code.\n");    
                    } else {
                        foundCode = true;
                        pushText(transcript, "Ignoring code listing - cannot read it out loud.\n");
                    }
                    break;
                }
                case 'div': {
                    if (n.classList.contains("notice")) {
                        pushText(transcript, "Please note: ");
                    }
                    break;
                }
                case 'h2': { 
                    pushText(transcript, text);
                    break;
                }
                default:
                    console.log("Narrator: ignoring tag " + tagName);
                }
        });
    });
    
    const discoveredText = transcript.filter(function(entry) { return entry.trim() != ''; });

    if (discoveredText.length === 0) {
        discoveredText.push("Sorry, no text content found to read aloud.");
    }

    return discoveredText;
}

async function playTranscript(transcript){
    for (const segment of transcript){
        await playSegment(segment);
    }
}
 
async function playSegment(segment){
    return new Promise( resolve =>{
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(segment);
        utterance.rate = 0.8;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        console.log("Narrator: " + segment);
        synthesis.speak(utterance);
    })
}

export const initNarratePostContent = () => {
    const narrationButton = document.querySelector(".narrator");

    if (!narrationButton) {
        return;
    }
    
    const defaultTabTitle = document.title;

    const isSynthAvailable = window.speechSynthesis !== undefined;
    if (isSynthAvailable) {
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
    } else {
        narrationButton.style.display = "none";
    }
}
