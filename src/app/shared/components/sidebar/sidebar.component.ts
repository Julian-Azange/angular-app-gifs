import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
    selector: 'shared-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    constructor(private gifsService: GifsService) { }

    get tagHistory(): string[] {
        return this.gifsService.tagHistory;
    }

    searchTag(tag: string) {
        this.gifsService.searchTag(tag);
    }

    clearHistory() {
        this.gifsService.clearHistory();
    }

    isSidebarOpen = false; // Variable para rastrear el estado del sidebar

    // Función para alternar el estado del sidebar
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
        console.log('clic')
    }
}
