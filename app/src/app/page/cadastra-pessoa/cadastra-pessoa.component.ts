import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { REGEX_PATTERNS } from '../../core/utils/padroes-validacao';
import { PessoasService } from '../../service/pessoas/pessoas.service';
import { NotificationService } from '../../service/notification/notification.service';
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
    private pessoasService: PessoasService,
    private notificationService: NotificationService
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
      next: () => {
        this.notificationService.showSuccess('Pessoa cadastrada com sucesso!');
        this.cadastroForm.reset();
      },
      error: (err) => {
        this.notificationService.showError('Ocorreu um erro ao cadastrar a pessoa.');
        console.error(err);
      }
    });
  }

}