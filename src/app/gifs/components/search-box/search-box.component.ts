

import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    template: `
    <div class="container mt-2">
        <h1 class="text-start">Bienvenido👋🏼</h1>
            <input type="text"
            class="form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag( )"
            #inputSearch>
    </div>
    
    `
})

export class SearchBoxComponent {
    @ViewChild('inputSearch')
    public tagInput!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) { }

    searchTag() {
        const tag = this.tagInput.nativeElement.value;
        if (tag.trim().length > 0) {
            this.gifsService.searchTag(tag);
            this.tagInput.nativeElement.value = '';
        }
    }
}