
/**
 * need to make an interface that shows predicted results of API
 */

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
}

function getDef(word): Promise {
    //API call here
    return fetch(('https://api.dictionaryapi.dev/api/v2/entries/en/' + word), {
        method: 'GET',

    }
}

