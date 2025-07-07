import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoa } from '../../core/models/pessoa.interface';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta-pessoa.component.html',
  styleUrls: ['./consulta-pessoa.component.scss']
})
export class ConsultaPessoaComponent {

  public searchForm: FormGroup;
  public isLoading: boolean = false;
  // ✅ Variável para guardar os dados da pessoa encontrada
  public pessoaEncontrada: Pessoa | null = null;

  constructor(private matSnackbar: MatSnackBar) {
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
    // ✅ Limpa o resultado anterior antes de uma nova busca
    this.pessoaEncontrada = null; 
    const cpfBuscado = this.searchForm.value.cpf;

    setTimeout(() => {
      if (cpfBuscado === '11111111111') {
        // ✅ SUCESSO: Preenche o objeto com os dados da pessoa
        this.pessoaEncontrada = {
          nome: 'João da Silva',
          cpf: '111.111.111-11',
          sexo: 'Masculino',
          email: 'joao.silva@exemplo.com',
          telefone: '(11) 98765-4321'
        };
      } else {
        this.exibirMensagemErro('Pessoa não encontrada. Verifique o CPF e tente novamente.');
      }

      this.isLoading = false;
    }, 1500);
  }

  exibirMensagemErro(mensagem: string): void {
    this.matSnackbar.open(mensagem, 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}