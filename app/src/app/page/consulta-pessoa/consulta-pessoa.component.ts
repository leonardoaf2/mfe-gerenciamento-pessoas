import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Pessoa } from '../../core/models/pessoa.interface';
import { PessoasService } from '../../service/pessoas/pessoas.service';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta-pessoa.component.html',
  styleUrls: ['./consulta-pessoa.component.scss']
})
export class ConsultaPessoaComponent {

  public searchForm: FormGroup;
  public isLoading: boolean = false;
  public pessoaEncontrada: Pessoa | null = null;

  constructor(
    private pessoasService: PessoasService,
    private notificationService: NotificationService
  ) {
    this.searchForm = new FormGroup({
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    });
  }

  buscarPessoa(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.pessoaEncontrada = null;
    const cpfBuscado = this.searchForm.value.cpf;

    this.pessoasService.buscarPessoaPorCpf(cpfBuscado).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (pessoa) => {
        this.pessoaEncontrada = pessoa;
      },
      error: (err) => {
        this.notificationService.showError('Pessoa não encontrada. Verifique o CPF e tente novamente.');
      }
    });
  }

}