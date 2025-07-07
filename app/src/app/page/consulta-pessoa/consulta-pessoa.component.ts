import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Pessoa } from '../../core/models/pessoa.interface';
import { PessoasService } from '../../service/pessoas.service';

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
    private matSnackbar: MatSnackBar,
    private pessoasService: PessoasService
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
        this.exibirMensagemErro(err.message);
      }
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