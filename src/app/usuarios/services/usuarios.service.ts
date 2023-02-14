import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';

import { Usuario } from './../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly API = '/api/usuarios';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Usuario[]>(this.API).pipe(first(), delay(500));
  }

  loadById(id: string) {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`);
  }

  loadByLogin(login: string) {
    return this.httpClient.get<Usuario>(`${this.API}/${login}`);
  }

  save(record: Partial<Usuario>) {
    console.log(record.login);
    if (this.httpClient.get<Usuario>(`${this.API}/login/${record.login}`)) {
      console.log(
        this.httpClient.get<Usuario>(`${this.API}/login/${record.login}`)
      );
    } else {
      console.log('Usuário não existe');
    }

    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Usuario>) {
    return this.httpClient.post<Usuario>(this.API, record).pipe(first());
  }

  private update(record: Partial<Usuario>) {
    return this.httpClient
      .put<Usuario>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  public remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
