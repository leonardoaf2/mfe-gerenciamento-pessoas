import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pessoa } from '../core/models/pessoa.interface';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private apiUrl = 'api/pessoas';

  constructor(private http: HttpClient) { }

  buscarPessoaPorCpf(cpf: string): Observable<Pessoa> {
    const url = `${this.apiUrl}/?cpf=${cpf}`;
    
    return this.http.get<Pessoa[]>(url).pipe(
      map(pessoas => {
        if (pessoas.length > 0) {
          return pessoas[0];
        }
        throw new Error('Pessoa não encontrada');
      }),
      catchError(this.handleError)
    );
  }

  cadastrarPessoa(novaPessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, novaPessoa).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Um erro ocorreu: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}