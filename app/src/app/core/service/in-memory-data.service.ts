import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pessoa } from '../models/pessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pessoas: Pessoa[] = [
      {
        id: 1, 
        nome: 'Cleber Roger',
        cpf: '11111111111', 
        sexo: 'Masculino',
        email: 'cleber13@exemplo.com',
        telefone: '11987654321'
      },
      {
        id: 2,
        nome: 'Sara silva',
        cpf: '22222222222',
        sexo: 'Feminino',
        email: 'sarasa12@exemplo.com',
        telefone: '21912345678'
      }
    ];
    return { pessoas };
  }

  genId(pessoas: Pessoa[]): number {
    return pessoas.length > 0 ? Math.max(...pessoas.map(p => p.id as number)) + 1 : 11;
  }
}