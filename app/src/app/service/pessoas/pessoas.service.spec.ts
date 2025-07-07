import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PessoasService } from './pessoas.service';
import { Pessoa } from '../../core/models/pessoa.interface';

describe('PessoasService', () => {
  let service: PessoasService;
  let httpMock: HttpTestingController;
  const apiUrl = 'api/pessoas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PessoasService]
    });
    service = TestBed.inject(PessoasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('buscarPessoaPorCpf', () => {
    it('deve retornar uma Pessoa quando o CPF for encontrado', () => {
      const mockPessoa: Pessoa = { id: 1, nome: 'Pessoa Teste', cpf: '12345678901', email: 'teste@email.com', sexo: 'Outro', telefone: '11999999999' };
      const cpf = '12345678901';

      service.buscarPessoaPorCpf(cpf).subscribe(pessoa => {
        expect(pessoa).toEqual(mockPessoa);
      });

      const req = httpMock.expectOne(`${apiUrl}/?cpf=${cpf}`);
      expect(req.request.method).toBe('GET');
      req.flush([mockPessoa]);
    });

    it('deve retornar um erro quando o CPF não for encontrado', () => {
      const cpf = '00000000000';
      const expectedErrorMsg = 'Pessoa não encontrada';

      service.buscarPessoaPorCpf(cpf).subscribe({
        next: () => fail('deveria ter falhado com o erro de não encontrado'),
        error: (error: Error) => {
          expect(error.message).toContain(expectedErrorMsg);
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/?cpf=${cpf}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('deve tratar um HttpErrorResponse', () => {
      const cpf = '12312312312';
      const statusErro = 500;

      service.buscarPessoaPorCpf(cpf).subscribe({
        next: () => fail('deveria ter falhado com um erro HTTP'),
        error: (error: Error) => {
          expect(error.message).toContain('Algo deu errado');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/?cpf=${cpf}`);
      expect(req.request.method).toBe('GET');
      req.flush('Erro no servidor', { status: statusErro, statusText: 'Internal Server Error' });
    });

    it('deve tratar um erro de rede ou do lado do cliente', () => {
      const cpf = '45645645645';
      const mockErrorEvent = new ErrorEvent('NetworkError', {
        message: 'Falha de rede simulada'
      });

      service.buscarPessoaPorCpf(cpf).subscribe({
        next: () => fail('deveria ter falhado com um erro de rede'),
        error: (error: Error) => {
          expect(error.message).toContain('Algo deu errado');
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/?cpf=${cpf}`);
      expect(req.request.method).toBe('GET');
      req.error(mockErrorEvent);
    });
  });

  describe('cadastrarPessoa', () => {
    it('deve fazer um POST e retornar a pessoa cadastrada com um id', () => {
      const novaPessoa: Pessoa = { nome: 'Nova Pessoa', cpf: '98765432100', email: 'nova@email.com', sexo: 'Feminino', telefone: '21988887777' };
      const pessoaCadastrada: Pessoa = { id: 2, ...novaPessoa };

      service.cadastrarPessoa(novaPessoa).subscribe(pessoa => {
        expect(pessoa).toEqual(pessoaCadastrada);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(novaPessoa);
      req.flush(pessoaCadastrada);
    });

    it('deve tratar um erro ao cadastrar uma pessoa', () => {
      const novaPessoa: Pessoa = { nome: 'Nova Pessoa', cpf: '98765432100', email: 'nova@email.com', sexo: 'Feminino', telefone: '21988887777' };
      const statusErro = 409;

      service.cadastrarPessoa(novaPessoa).subscribe({
        next: () => fail('deveria ter falhado ao cadastrar'),
        error: (error: Error) => {
          expect(error.message).toContain('Algo deu errado');
        }
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush('CPF já existe', { status: statusErro, statusText: 'Conflict' });
    });
  });
});