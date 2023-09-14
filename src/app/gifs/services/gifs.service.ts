import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = "CN5KSXsRFSsnucNGN6VJ5a26pSQd2iW3"

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = GIPHY_API_KEY;
    private serviceUrl = "https://api.giphy.com/v1/gifs"

    constructor( private http: HttpClient) {
        this.readLocalStorage();
    }

    get tagHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.trim().toLowerCase();
        if(this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
        }
        this._tagsHistory.unshift( tag );
        this._tagsHistory = this._tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage() {
        localStorage.setItem('tagHistory', JSON.stringify(this._tagsHistory));
    }

    private readLocalStorage() {
        if(localStorage.getItem('tagHistory')) {
            this._tagsHistory = JSON.parse(localStorage.getItem('tagHistory')!);
        }
        if(this._tagsHistory.length === 0) return;
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag( tag: string ): void {
        if ( tag.trim().length === 0 ) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
            .subscribe( (response) => {
                this.gifList = response.data;
                localStorage.setItem('tagHistory', JSON.stringify(this._tagsHistory));
                console.log(response.data)

            });

        /*  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`).then( (response) => {
            response.json().then( (data) => {
                console.log(data);
            });
        }); */
    }

    clearHistory() {
        this._tagsHistory = [];
        this.saveLocalStorage();
        this.gifList = [];
    }
    
}