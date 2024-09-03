'use strict';
import { seedGenerator, uniqueId, randomNumber, deepCopy } from './seido-helpers.js';

export function Book(title, author, genre, millionSold, publishYear) {

    this.bookId = uniqueId();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.millionsSold = millionSold;
    this.publishedYear = publishYear;

    this.toString = function () {
        return `${this.title} written by ${this.author} in the year ${this.publishedYear}. ${this.millionsSold} million copies sold`;
    }

    this.seed = function (_seeder) {

        this.title = _seeder.latinSentence;
        this.author = _seeder.fullName;
        this.genre = _seeder.fromString("Adventure, Horror, SciFi, Computers, Animals, Children");
        this.millionsSold = randomNumber(1, 100);
        this.publishedYear = randomNumber(1800, 2020);
        return this;
    }

    this.seedMany = function (nrItems, _seeder) {
        let books = [];
        for (let index = 0; index < nrItems; index++) {

            const b = new Book().seed(_seeder);
            books.push(b);
        };
        return books;
    }
}

export function LibraryService(storage) {

    if (!storage) {
        const _seeder = new seedGenerator();
        this.books = new Book().seedMany(1_000, _seeder);
    }
    else {
        const tmp = storage.getItem('LibraryService');
        if (tmp) {
            this.books = JSON.parse(tmp);
        }
        else {
            const _seeder = new seedGenerator();
            this.books = new Book().seedMany(1_000, _seeder);
            storage.setItem('LibraryService', JSON.stringify(this.books));
        }
    }

    //services
    this.info = function (genre) {

        if (genre === undefined) return this.books.length;

        let count = 0;
        this.books.forEach(b => {
            if (b.genre === genre) {
                count++;
            }
        });
        return count;
    }

    this.readBooks = function (pageNr, pageSize, genre = null) {

        //return this.books;

        const ret = {};

        ret.pageNr = pageNr;
        ret.pageSize = pageSize;
        ret.maxNrpages = Math.ceil(this.books.length / pageSize);
        ret.totalCount = this.books.length;

        if (genre)
            ret.pageItems = this.books.filter(b => b.genre.toLowerCase() === genre.toLowerCase()).slice(pageNr * pageSize, pageNr * pageSize + pageSize);

        else
            ret.pageItems = this.books.slice(pageNr * pageSize, pageNr * pageSize + pageSize);

        return ret;
    }

    this.readBook = function (id) {
        return this.books.find(book => book.bookId === id);
    }
}