import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastra-pessoa',
  templateUrl: './cadastra-pessoa.component.html',
  styleUrls: ['./cadastra-pessoa.component.scss']
})
export class CadastraPessoaComponent {

  public cadastroForm: FormGroup;
  public isLoading: boolean = false;

  // Injetamos o FormBuilder para facilitar a criação do formulário
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    // Regex para validar e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      sexo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]] // (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
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