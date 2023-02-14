import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private readonly API = '/api/enderecos';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Endereco[]>(this.API).pipe(first(), delay(500));
  }

  loadById(id: string) {
    return this.httpClient.get<Endereco>(`${this.API}/${id}`);
  }
  save(record: Partial<Endereco>) {
    console.log(record.login);
    if (this.httpClient.get<Endereco>(`${this.API}/login/${record.login}`)) {
      console.log(
        this.httpClient.get<Endereco>(`${this.API}/login/${record.login}`)
      );
    } else {
      console.log('Endereço não existe.');
    }

    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Endereco>) {
    return this.httpClient.post<Endereco>(this.API, record).pipe(first());
  }

  private update(record: Partial<Endereco>) {
    return this.httpClient
      .put<Endereco>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  public remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
