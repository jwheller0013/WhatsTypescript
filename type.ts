
// Def interface for API
interface Phonetic {
  text?: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meanings {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  origin?: string;
  meanings: Meanings[];
  sourceUrls?: string[];
}
// Refs for type casting
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton") as HTMLButtonElement | null;
    const wordInput = document.getElementById("wordInput") as HTMLInputElement | null;
    const displayResultDiv = document.getElementById("result") as HTMLDivElement | null;
    const defineForm = document.getElementById("defineform") as HTMLFormElement | null;
    // Listener
    if (defineForm && wordInput && displayResultDiv && searchButton) {
        defineForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission
            const word = wordInput.value.trim();
            if (word) {
                getMeaning(word, displayResultDiv, wordInput);
            } else {
                displayResultDiv.textContent = "Please enter a word.";
            }
        });
    } else {
        console.error("One or more DOM elements (defineForm, wordInput, searchButton, result) not found.");
    }
});
// Fetch
const getMeaning = async (
    word: string, 
    outputElement: HTMLElement,
    inputElement: HTMLInputElement
): Promise<void> => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    console.log('API Response:', response);

    if (!response.ok) {
      throw new Error("Sorry. Word not found");
    }
    const data: DictionaryEntry[] = await response.json();
    displayMeaning(data, outputElement);
  } catch (error: any) {
    outputElement.textContent = error.message;
  } finally {
    inputElement.value = "";
    }
  }


const displayMeaning = (data: DictionaryEntry[], outputElement: HTMLElement): void => {
  outputElement.innerHTML = ""; // Clear previous results
  if (data.length === 0) {
    outputElement.textContent = "No definition found for this word.";
    return;
  }

  const wordData = data[0];

  const title = document.createElement('h2');
  title.classList.add('result-title');
  title.textContent = wordData.word;
  outputElement.appendChild(title);

  if (wordData.phonetics && wordData.phonetics.length > 0) {
    const phoneticsDiv = document.createElement('div');
    wordData.phonetics.forEach(p => {
      if (p.text) {
        const phoneticSpan = document.createElement('span');
        phoneticSpan.classList.add('phonetic');
        phoneticSpan.textContent = p.text;
        phoneticsDiv.appendChild(phoneticSpan);
      }
      if (p.audio) {
        const audioElement = document.createElement('audio');
        audioElement.classList.add('result-audio');
        audioElement.controls = true;
        audioElement.src = p.audio;
        phoneticsDiv.appendChild(audioElement);
      }
    });
    outputElement.appendChild(phoneticsDiv);
  } else if (wordData.phonetic) {
    const phoneticSpan = document.createElement('p');
    phoneticSpan.classList.add('phonetic');
    phoneticSpan.textContent = wordData.phonetic;
    outputElement.appendChild(phoneticSpan);
  }

  if (wordData.meanings && wordData.meanings.length > 0) {
    const meaningsDiv = document.createElement('div');
    meaningsDiv.classList.add('meanings');
    wordData.meanings.forEach(meaning => {
      const partOfSpeechHeading = document.createElement('h3');
      partOfSpeechHeading.textContent = meaning.partOfSpeech;
      meaningsDiv.appendChild(partOfSpeechHeading);

      if (meaning.definitions && meaning.definitions.length > 0) {
        const definitionsList = document.createElement('ul');
        meaning.definitions.forEach(def => {
          const listItem = document.createElement('li');
          listItem.textContent = def.definition;
          if (def.example) {
            const example = document.createElement('p');
            example.classList.add('example');
            example.textContent = `"${def.example}"`;
            listItem.appendChild(example);
          }
          if (def.synonyms && def.synonyms.length > 0) {
            const synonyms = document.createElement('p');
            synonyms.classList.add('synonyms');
            synonyms.textContent = `Synonyms: ${def.synonyms.join(', ')}`;
            listItem.appendChild(synonyms);
          }
          if (def.antonyms && def.antonyms.length > 0) {
            const antonyms = document.createElement('p');
            antonyms.classList.add('antonyms');
            antonyms.textContent = `Antonyms: ${def.antonyms.join(', ')}`;
            listItem.appendChild(antonyms);
          }
          definitionsList.appendChild(listItem);
        });
        meaningsDiv.appendChild(definitionsList);
      }
    });
    outputElement.appendChild(meaningsDiv);
  }

  if ((wordData as any).sourceUrls && (wordData as any).sourceUrls.length > 0) {
    const sourceLink = document.createElement('div');
    sourceLink.classList.add('result-item');
    const link = document.createElement('a');
    link.href = (wordData as any).sourceUrls[0];
    link.textContent = 'Source';
    link.target = '_blank';
    sourceLink.appendChild(link);
    outputElement.appendChild(sourceLink);
  }
};









// function getDef(word): Promise {
//     //API call here
//     return fetch(('https://api.dictionaryapi.dev/api/v2/entries/en/' + word), {
//         method: 'GET',
//         headers: {

//         },
//     })

// }

