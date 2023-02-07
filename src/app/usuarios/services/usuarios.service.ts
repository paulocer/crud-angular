import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Usuario } from './../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // private readonly API = 'http://localhost:8085/api/usuarios';
  private readonly API = '/api/usuarios';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Usuario[]>(this.API)
      .pipe(
        first(),
        delay(1000),
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`);
  }

  save(record: Partial<Usuario>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Usuario>) {
    return this.httpClient.post<Usuario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Usuario>) {
    return this.httpClient.put<Usuario>(`${this.API}/${record._id}`, record).pipe(first());
  }

}
