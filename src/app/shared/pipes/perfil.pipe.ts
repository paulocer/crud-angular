import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfil'
})
export class PerfilPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Administrador': return 'manage_accounts';
      case 'Comum': return 'account_circle';
    }
    return 'no_accounts';
  }

}
