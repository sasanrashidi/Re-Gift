'use strict';

import masterSeeds from './master-seeds.js';

export class seedGenerator {

    constructor() {
        this._seeds = masterSeeds();
        this._petNames = this._seeds._names.jsonPetNames.split(', ').map(s => s.trim());
        this._firstNames = this._seeds._names.jsonFirstNames.split(', ').map(s => s.trim());
        this._lastNames = this._seeds._names.jsonLastNames.split(', ').map(s => s.trim());

        this._addresses = this._seeds._addresses.map(a => {
            return {
                _country: a.jsonCountry,
                _cities: a.jsonCities.split(', ').map(s => s.trim()),
                _streets: a.jsonStreets.split(', ').map(s => s.trim())
            }
        });

        this._domains = this._seeds._domains.jsonDomainNames.split(', ').map(s => s.trim());

        this._quotes = this._seeds._quotes.map(q => {
            return {
                _quote: q.jsonQuote,
                _author: q.jsonAuthor
            }
        });


        this._latin = this._seeds._latin.map(q => {
            return {
                _paragraph: q.jsonParagraph,
                _sentences: q.jsonParagraph.split('. ').map(s => s.trim()),
                _words: q.jsonParagraph.split(' ').map(s => s.trim()),
            }
        });

        this._music = {
            _groupNames: this._seeds._music.jsonGroupNames.split(', ').map(s => s.trim()),
            _albumNames: this._seeds._music.jsonAlbumNames.split(', ').map(s => s.trim()),
            _albumPrefix: this._seeds._music.jsonAlbumPrefix.split(', ').map(s => s.trim()),
            _albumSuffix: this._seeds._music.jsonAlbumSuffix.split(', ').map(s => s.trim())
        };
    }


    //#region Names
    get petName() { return this._petNames[randomNumber(0, this._petNames.length)] };
    get firstName() { return this._firstNames[randomNumber(0, this._firstNames.length)] };
    get lastName() { return this._lastNames[randomNumber(0, this._lastNames.length)] };
    get fullName() { return `${this.firstName} ${this.lastName}` };
    //#endregion


    //#region Addresses
    get country() { return this._addresses[randomNumber(0, this._addresses.length)]._country };
    city = (country = null) => {
        if (country !== null) {
            const adr = this._addresses.find(c => c._country.toLowerCase() === country.trim().toLowerCase());
            if (adr === undefined)
                throw Error("Country not found");

            return adr._cities[randomNumber(0, adr._cities.length)];
        }

        const tmp = this._addresses[randomNumber(0, this._addresses.length)];
        return tmp._cities[randomNumber(0, tmp._cities.length)];
    }

    street = (country = null) => {
        if (country !== null) {
            const adr = this._addresses.find(c => c._country.toLowerCase() === country.trim().toLowerCase());
            if (adr === undefined)
                throw Error("Country not found");

            return `${adr._streets[randomNumber(0, adr._cities.length)]} ${randomNumber(0, 100)}`;
        }

        const tmp = this._addresses[randomNumber(0, this._addresses.length)];
        return `${tmp._streets[randomNumber(0, tmp._streets.length)]}  ${randomNumber(0, 100)}`;
    }

    get zipCode() { return randomNumber(10101, 100000) };
    //#endregion

    //#region Emails and phones
    email = (fname = null, lname = null) => {
        fname ??= this.firstName;
        lname ??= this.lastName;

        return `${fname.toLowerCase().replace(' ', '_')}.${lname.toLowerCase().replace(' ', '_')}@${this._domains[randomNumber(0, this._domains.length)]}`;
    }

    get phoneNr() { return `${randomNumber(700, 800)} ${randomNumber(100, 1000)} ${randomNumber(100, 1000)}` };
    //#endregion

    //#region Quotes
    get allQuotes() {
        //deep copy of the []
        return this._quotes.map(q => {
            return {
                quote: q._quote,
                author: q._author
            }
        });
    }

    get quote() { return this.quotes(1).pop() };
    quotes = (tryNrOfItems) => {
        return this.uniqueIndexPickFromList(tryNrOfItems, this.allQuotes);
    }
    //#endregion


    //#region Latin
    get allLatin() {
        //deep copy of the []
        return this._latin.map(l => {
            return {
                paragraph: l._paragraph,
                sentences: l._sentences,
                words: l._words
            }
        });
    }

    get latinParagraph() { return this.latinParagraphs(1).pop() };
    latinParagraphs = (tryNrOfItems) => {
        return this.uniqueIndexPickFromList(tryNrOfItems, this.allLatin);
    }


    get latinSentence() { return this.latinSentences(1).pop() };
    latinSentences = (tryNrOfItems) => {
        const ret = [];
        for (let i = 0; i < tryNrOfItems; i++) {
            const pIdx = randomNumber(0, this.allLatin.length);
            const sIdx = randomNumber(0, this.allLatin[pIdx].sentences.length);

            ret.push(this.allLatin[pIdx].sentences[sIdx]);
        }
        return ret;
    }

    get latinWord() { return this.latinWords(1).pop() };
    latinWords = (tryNrOfItems) => {
        const ret = [];
        for (let i = 0; i < tryNrOfItems; i++) {
            const pIdx = randomNumber(0, this.allLatin.length);
            const wIdx = randomNumber(0, this.allLatin[pIdx].words.length);

            ret.push(this.allLatin[pIdx].words[wIdx]);
        }
        return ret;
    }
    //#endregion

    //#region Music
    get musicBandName() {
        let ret = `The ${this._music._groupNames[randomNumber(0, this._music._groupNames.length)]}`;
        ret = `${ret} ${this._music._groupNames[randomNumber(0, this._music._groupNames.length)]}`;
        return ret;
    }
    get musicAlbumName() {
        let ret = `The ${this._music._albumPrefix[randomNumber(0, this._music._albumPrefix.length)]}`;
        ret = `${ret} ${this._music._albumNames[randomNumber(0, this._music._albumNames.length)]}`;
        ret = `${ret} ${this._music._albumNames[randomNumber(0, this._music._albumNames.length)]}`;
        ret = `${ret} ${this._music._albumSuffix[randomNumber(0, this._music._albumSuffix.length)]}`;
        return ret;
    }
    //#endregion

    //#region DateTime, bool and decimal
    dateAndTime = (fromYear = null, toYear = null) => {
        let _dateOK = false;
        let _date = new Date();
        fromYear ??= _date.getFullYear();
        toYear ??= _date.getFullYear() + 1;

        while (!_dateOK) {

            const _year = randomNumber(Math.min(fromYear, toYear), Math.max(fromYear, toYear));
            const _month = randomNumber(1, 13);
            const _day = randomNumber(1, 32);

            try {
                //_months are 0 based in JavaScript
                _date = createValidDate(_year, _month - 1, _day);
                _dateOK = true;
            }
            catch {
                _dateOK = false;
            }
        }

        return _date;
    }

    get bool() { return (randomNumber(0, 100) < 50) ? true : false; }
    //#endregion

    //#region From own string, and []
    fromString = (_inputString, _splitDelimiter = ", ") => {
        const _sarray = _inputString.split(_splitDelimiter);
        return _sarray[randomNumber(0, _sarray.length)];
    }
    fromArray = (_items) => {
        return _items[randomNumber(0, _items.length)];
    }
    //#endregion

    //#region Generate seeded [] of seedObj copies
    toArray = (NrOfItems, fnCreateObj, protoObj = null) => {
        //Create a list of seeded items
        const _list = [];
        for (let c = 0; c < NrOfItems; c++) {
            let v = fnCreateObj(this);
            if (protoObj !== null) {
                Object.setPrototypeOf(v, protoObj);
            }

            _list.push(v);
        }
        return _list;
    }

    //Pick a number of items, all from unique indexes in list
    uniqueIndexPickFromList = (tryNrOfItems, list) => {
        //list of unique indexes
        const _set = new Set();

        while (_set.size < tryNrOfItems) {
            var _idx = randomNumber(0, list.length);

            let _preCount = _set.size;
            let tries = 0;
            do {
                _set.add(_idx);

                if (_set.size === _preCount) {
                    //Idx was already in the _set. Generate a new one
                    _idx = randomNumber(0, list.Count);
                    ++tries;

                    //Does not seem to be able to generate new unique idx
                    if (tries > 5)
                        break;
                }

            } while (_set.size <= _preCount);
        }


        //I have now a set of unique idx
        //return a list of items from a list with indexes
        const retList = [];
        _set.forEach((v, k, s) => {
            retList.push(list[v]);
        })
        return retList;
    }
    //#endregion
}

//Various Helpers
//uniqueId to generate a uniqueID, not a perfect solution but simple and enough for our 
export function uniqueId() {
    const dateString = Date.now().toString(16);
    const randomness = Math.random().toString(16).substring(2);
    return dateString + randomness;
};

//helper function to clone an object using deep copy with the help of json serialization
export function deepCopy(o) {
    return JSON.parse(JSON.stringify(o));
}

//randomNumber = Math.floor(Math.random() * (max - min) ) + min;
//non inclusive max, but inclusive min
export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomDecimal(_from, _to, _nrDecimals = 3) {
    return randomNumber(_from * 10 ** _nrDecimals, _to * 10 ** _nrDecimals) / 10 ** _nrDecimals
};


//Check for invalid dates caused by date overflow. I.e. Feb 29 -> March 1 in JavaScript.
export function createValidDate(year, month, _date) {
    var d = new Date(year, month, _date);
    if (d.getFullYear() !== year
        || d.getMonth() !== month
        || d.getDate() !== _date) {

        throw Error("invalid date");
    }
    return d;
}


//Recursive helper to check object value equality by means of comparing properties
export function isEqual(obj1, obj2) {
    var props1 = Object.keys(obj1);
    var props2 = Object.keys(obj2);

    if (props1.length !== props2.length) {
        return false;
    }

    for (var i = 0; i < props1.length; i++) {
        let val1 = obj1[props1[i]];
        let val2 = obj2[props1[i]];
        let isObjects = isObject(val1) && isObject(val2);

        if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
            return false;
        }
    }
    return true;
}

function isObject(object) {
    return object !== null && typeof object === 'object';
}

export function isEqualArray(arrayA, arrayB) {
    if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
        // These objects are null, undeclared, or non-array objects
        return false;
    }
    else if (arrayA === arrayB) {
        // Shortcut: they're two references pointing to the same array
        return true;
    }
    else if (arrayA.length !== arrayB.length) {
        // They can't match if they have a different item count
        return false;
    }
    else {
        // Time to look closer at each item
        for (let i = 0; i < arrayA.length; ++i) {
            // We require items to have the same content and be the same type,
            // but you could use loosely typed equality depending on your task
            if (arrayA[i] !== arrayB[i]) return false;
        }
        return true;
    }
}

export function removeArrayDuplicates(_array) {
    return _array.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === _array.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
}
