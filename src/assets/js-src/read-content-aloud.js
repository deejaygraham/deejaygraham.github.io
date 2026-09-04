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

async function playTranscript(transcript, options, shouldContinue){
    for (const segment of transcript){
      if (!shouldContinue()) {
        return;
      }
      
      await playSegment(segment, options);
    }
}
 
async function playSegment(segment, { rate, voiceUri} ){
    return new Promise(resolve =>{
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(segment);
        const voice = synthesis.getVoices().find((candidate) => candidate.voiceURI === voiceUri);
        if (voice) {
          utterance.voice = voice;
        }
      
        utterance.rate = rate;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        // debug
        console.log("Narrator: " + segment);
      
        synthesis.speak(utterance);
    })
}

const populateVoiceOptions = (voiceSelect, synthesis) => {
  const preferredVoice = getPreference(narrationVoicePreferenceKey) || voiceSelect.value;
  const voices = [...synthesis.getVoices()].sort((left, right) =>
    `${left.lang} ${left.name}`.localeCompare(`${right.lang} ${right.name}`),
  );
  const defaultOption = new Option("Device default", "");
  const options = voices.map((voice) => {
    const defaultLabel = voice.default ? " — default" : "";
    return new Option(`${voice.name} (${voice.lang})${defaultLabel}`, voice.voiceURI);
  });

  voiceSelect.replaceChildren(defaultOption, ...options);
  if (voices.some((voice) => voice.voiceURI === preferredVoice)) {
    voiceSelect.value = preferredVoice;
  }
};

export const initNarratePostContent = () => {
    const narrationButton = document.querySelector("#read-aloud");
    const narrator = narrationButton?.closest(".narrator");
    const rateSelect = document.querySelector("#narrator-rate");
    const voiceSelect = document.querySelector("#narrator-voice");

    if (!narrationButton || !narrator || !rateSelect || !voiceSelect) {
        return;
    }
    
    const defaultTabTitle = document.title;

    const isSynthAvailable = window.speechSynthesis !== undefined;
    if (!isSynthAvailable) {
      narrator.hidden = true;
      return;
    }

    const synthesis = window.speechSynthesis;
    const defaultTabTitle = document.title;
    const storedRate = getPreference(narrationRatePreferenceKey);
    let narrationId = 0;
    let isNarrating = false;

    rateSelect.value = supportedNarrationRates.has(storedRate)
      ? storedRate
      : defaultNarrationRate;

    populateVoiceOptions(voiceSelect, synthesis);
    synthesis.addEventListener("voiceschanged", () => populateVoiceOptions(voiceSelect, synthesis));

    rateSelect.addEventListener("change", () => {
      savePreference(narrationRatePreferenceKey, rateSelect.value);
    });
    
    voiceSelect.addEventListener("change", () => {
      savePreference(narrationVoicePreferenceKey, voiceSelect.value);
    });

    const setNarratingState = (active) => {
      isNarrating = active;
      document.title = active ? "[🔊] " + defaultTabTitle : defaultTabTitle;
      narrationButton.classList.toggle("narrator-active", active);
      narrationButton.setAttribute(
        "aria-label",
        active ? "Stop reading this page aloud" : "Read this page aloud",
      );
    };
  
    // stop audio when user navigates away from the page
    window.addEventListener("beforeunload", () => {
        narrationId += 1;
        synthesis.cancel();
    });

    // change title of the tab when audio is playing (to show that audio is playing)
    window.setInterval(() => {
        if (synthesis.speaking) {
            document.title = "[🔊] " + defaultTabTitle;
            narrationButton.classList.add("narrator-active");
        } else {
            document.title = defaultTabTitle;
            narrationButton.classList.remove("narrator-active");
        }
    }, 500);

    narrationButton.addEventListener("click", async () => {
      if (isNarrating) {
        narrationId += 1;
        synthesis.cancel();
        setNarratingState(false);
        return;
      }

      const currentNarrationId = ++narrationId;
      const options = {
        rate: Number(rateSelect.value),
        voiceUri: voiceSelect.value,
      };

      setNarratingState(true);
      await playTranscript(generateTranscript(), options, () => currentNarrationId === narrationId);
      if (currentNarrationId === narrationId) {
        setNarratingState(false);
      }
    });
}
