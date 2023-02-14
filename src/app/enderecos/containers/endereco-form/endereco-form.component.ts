import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Endereco } from '../../model/endereco';
import { EnderecosService } from '../../service/enderecos.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.scss'],
})
export class EnderecoFormComponent implements OnInit {
  formEndereco = this.formBuilder.group({
    _id: [''],
    login: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
    logradouro: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(45)],
    ],
    numero: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(15)],
    ],
    complemento: ['', [Validators.maxLength(15)]],
    bairro: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(45)],
    ],
    cep: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(10)],
    ],
    cidade: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(45)],
    ],
    uf: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    ],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: EnderecosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    // this.formEndereco
  }

  ngOnInit(): void {
    const endereco: Endereco = this.route.snapshot.data['endereco'];
    this.formEndereco.setValue({
      _id: endereco._id,
      login: endereco.login,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidade: endereco.cidade,
      uf: endereco.uf,
    });
  }

  onSubmit() {
    this.service.save(this.formEndereco.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (Error) => this.onError(),
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Endereço cadastrado com sucesso!', '', {
      duration: 5000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar endereço.', '', { duration: 5000 });
  }

  consultaCEP(cep: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^\d{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //  this.httpClient
        //    .get(`//viacep.com.br/ws/${cep}/json`)
        //    .pipe(map((dados: any) => dados))
        //    .subscribe((dados) => console.log(dados));
        console.log('Consultado CEP: ' + cep);
      }
    }
  }

  public getErrorMessage(fieldName: string) {
    const field = this.formEndereco.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo de preenchimento obrigatório.';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo permitido de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('email')) {
      return `Informe um e-mail válido.`;
    }

    return 'Campo inválido';
  }
}
