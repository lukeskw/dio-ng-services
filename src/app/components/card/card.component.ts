import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { fromEvent, debounceTime, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  pokemon: Pokemon = {
    id: 0,
    name: '',
    sprites: {
      front_default: '',
    },
    types: []
  };

  @ViewChild('searchInput') searchInputRef!: ElementRef;
  searchText$: any;

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.searchPokemonDebounced("pikachu");
  }

  searchPokemonDebounced(searchTerm: string) {
    this.service.getPokemon(searchTerm).subscribe({
      next: (response) => {
        this.pokemon = {
          id: response.id,
          name: response.name,
          sprites: response.sprites,
          types: response.types
        };
      },
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit() {
    this.searchText$ = fromEvent<KeyboardEvent>(this.searchInputRef.nativeElement, 'keyup')
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(400),
      );

    this.searchText$.subscribe((searchTerm: string) => {
      this.searchPokemonDebounced(searchTerm);
    });
  }
}
