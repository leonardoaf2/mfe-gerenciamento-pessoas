import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REGEX_PATTERNS } from '../../core/utils/padroes-validacao';
import { PessoasService } from '../../service/pessoas.service';
import { finalize } from 'rxjs';
import { Pessoa } from '../../core/models/pessoa.interface';

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
    private matSnackbar: MatSnackBar,
    private pessoasService: PessoasService
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
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const novaPessoa = this.cadastroForm.value as Pessoa;

    this.pessoasService.cadastrarPessoa(novaPessoa).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (pessoaCadastrada) => {
        console.log('API retornou:', pessoaCadastrada);
        this.exibirMensagemSucesso('Pessoa cadastrada com sucesso!');
        this.cadastroForm.reset();
      },
      error: (err) => {
        this.exibirMensagemErro('Ocorreu um erro ao cadastrar.');
        console.error(err);
      }
    });
  }

  exibirMensagemSucesso(mensagem: string): void {
    this.matSnackbar.open(mensagem, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  exibirMensagemErro(mensagem: string): void {
    this.matSnackbar.open(mensagem, 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}