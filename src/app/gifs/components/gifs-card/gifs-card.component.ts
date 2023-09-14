import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit {

    ngOnInit(): void {
      if(!this.gif) {
        throw new Error('GifsCardComponent must receive a gif as input');
      }
    }

    @Input()
    public gif!: Gif;
}
