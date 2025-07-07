import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REGEX_PATTERNS } from '../../core/utils/padroes-validacao';

@Component({
  selector: 'app-cadastra-pessoa',
  templateUrl: './cadastra-pessoa.component.html',
  styleUrls: ['./cadastra-pessoa.component.scss']
})
export class CadastraPessoaComponent {

  public cadastroForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
      this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(REGEX_PATTERNS.cpf)]],
      sexo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(REGEX_PATTERNS.email)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  cadastrarPessoa(): void {
    if (this.cadastroForm.invalid) {
      // Marca todos os campos como "tocados" para exibir os erros de validação
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // SIMULAÇÃO DE ENVIO PARA A API
    setTimeout(() => {
      console.log('Dados do formulário:', this.cadastroForm.value);
      this.isLoading = false;
      this.exibirMensagemSucesso('Pessoa cadastrada com sucesso!');
      this.cadastroForm.reset(); // Limpa o formulário após o sucesso
    }, 2000);
  }

  exibirMensagemSucesso(mensagem: string): void {
    this._snackBar.open(mensagem, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}