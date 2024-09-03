'use strict';

//WebApi service broken out in a class to give CRUD musicGroup, Album and Artist
class musicService {

    constructor(url) {
        this.url = url;
    }

    //#region private generic CRUD methods
    async #_myFetch(url, method = null, body = null) {
        try {

            method ??= 'GET';
            let res = await fetch(url, {
                method: method,
                headers: { 'content-type': 'application/json' },
                body: body ? JSON.stringify(body) : null
            });

            if (res.ok) {

                console.log(`\n${method} Request successful @ ${url}`);

                //get the data from server
                let data = await res.json();
                return data;
            }
            else {

                //typcially you would log an error instead
                console.log(`Failed to recieved data from server: ${res.status}\n${method} Request @ ${url}`);
                alert(`Failed to recieved data from server: ${res.status}\n${method} Request @ ${url}`);
            }
        }
        catch (err) {

            //typcially you would log an error instead
            console.log(`Failed to recieved data from server: ${err.message}\n${method} Request @ ${url}`);
            alert(`Failed to recieved data from server: ${err.message}\n${method} Request @ ${url}`);
        }
    }

    async #_readItemsAsync(reqUrl, pageNr, flat, filter, pageSize) {
        reqUrl += `?flat=${flat}&pageNr=${pageNr}&pageSize=${pageSize}`;
        if (filter != null) {
            reqUrl += `&filter=${filter}`
        }
        let data = await this.#_myFetch(reqUrl);
        return data;
    }

    async #_readItemAsync(reqUrl, id, flat) {
        reqUrl += `?flat=${flat}&id=${id}`;
        let data = await this.#_myFetch(reqUrl);
        return data;
    }

    async #_readItemDtoAsync(reqUrl, id, flat) {
        reqUrl += `?id=${id}`;
        let data = await this.#_myFetch(reqUrl);
        return data;
    }

    async #_updateItemAsync(reqUrl, id, newItem) {
        reqUrl += `/${id}`;
        let data = await this.#_myFetch(reqUrl, 'PUT', newItem);
        return data;
    }

    async #_createItemAsync(reqUrl, newItem) {
        let data = await this.#_myFetch(reqUrl, 'POST', newItem);
        return data;
    }

    async #_deleteItemAsync(reqUrl, id) {
        reqUrl += `/${id}`;
        let data = await this.#_myFetch(reqUrl, 'DELETE');
        return data;
    }

    async #_upsertItemAsync(reqUrl, newItem) {
        let data = await this.#_myFetch(reqUrl, 'POST', newItem);
        return data;
    }
    //#endregion

    async readInfoAsync() {
        return await this.#_myFetch(`${this.url}/csAdmin/Info`);
    }

    //#region CRUD MusicGroup
    //using traditional function syntax (like in C#)
    async readMusicGroupsAsync(pageNr, flat = false, filter = null, pageSize = 10) {
        return await this.#_readItemsAsync(`${this.url}/csMusicGroups/Read`, pageNr, flat, filter, pageSize);
    }

    //using JavaScrip's ability to asign a function to a variable or property (like c# delegate)
    readMusicGroupAsync = async (id, flat = true) => this.#_readItemAsync(`${this.url}/csMusicGroups/ReadItem`, id, flat);

    readMusicGroupDtoAsync = async (id) => this.#_readItemDtoAsync(`${this.url}/csMusicGroups/ReadItemDto`, id);

    updateMusicGroupAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csMusicGroups/UpdateItem`, id, newItem);

    createMusicGroupAsync = async (newItem) => this.#_createItemAsync(`${this.url}/csMusicGroups/CreateItem`, newItem);

    deleteMusicGroupAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csMusicGroups/DeleteItem`, id);
    //#endregion

    //#region CRUD Album
    readAlbumsAsync = async (pageNr, flat = false, filter = null, pageSize = 10) => this.#_readItemsAsync(`${this.url}/csAlbums/Read`, pageNr, flat, filter, pageSize);

    readAlbumAsync = async (id, flat = true) => this.#_readItemAsync(`${this.url}/csAlbums/ReadItem`, id, flat);

    readAlbumDtoAsync = async (id) => this.#_readItemDtoAsync(`${this.url}/csAlbums/ReadItemDto`, id);

    updateAlbumAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csAlbums/UpdateItem`, id, newItem);

    createAlbumAsync = async (newItem) => this.#_createItemAsync(`${this.url}/csAlbums/CreateItem`, newItem);

    deleteAlbumAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csAlbums/DeleteItem`, id);
    //#endregion

    //#region CRUD Artist
    readArtistsAsync = async (pageNr, flat = false, filter = null, pageSize = 10) => this.#_readItemsAsync(`${this.url}/csArtists/Read`, pageNr, flat, filter, pageSize);

    readArtistAsync = async (id, flat = true) => this.#_readItemAsync(`${this.url}/csArtists/ReadItem`, id, flat);

    readArtistDtoAsync = async (id, flat = true) => this.#_readItemDtoAsync(`${this.url}/csArtists/ReadItemDto`, id);

    updateArtistAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csArtists/UpdateItem`, id, newItem);

    upsertArtistAsync = async (newItem) => this.#_upsertItemAsync(`${this.url}/csArtists/UpsertItem`, newItem);

    deleteArtistAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csArtists/DeleteItem`, id);
    //#endregion
}

export default musicService;
