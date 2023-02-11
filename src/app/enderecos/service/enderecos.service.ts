import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private readonly API = 'http://localhost:8085/api/enderecos';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Endereco[]>(this.API).pipe(first(), delay(500));
  }
}
