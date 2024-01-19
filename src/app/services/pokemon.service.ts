import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = ""
  private pokeData!: Observable<Pokemon>;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.pokeApi
  }

  getPokemon(pokemonName: string): Observable<Pokemon>{
    this.pokeData =  this.http.get<Pokemon>(`${this.baseUrl}pokemon/${pokemonName}`)
    return this.pokeData
  }
}
