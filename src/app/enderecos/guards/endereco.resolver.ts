import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Endereco } from '../model/endereco';
import { EnderecosService } from '../service/enderecos.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoResolver implements Resolve<Endereco> {
  constructor(private service: EnderecosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Endereco> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      _id: '',
      login: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: '',
    });
  }
}
