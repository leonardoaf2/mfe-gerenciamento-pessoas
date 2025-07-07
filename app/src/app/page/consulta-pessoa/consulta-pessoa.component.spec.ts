import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ConsultaPessoaComponent } from './consulta-pessoa.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PessoasService } from '../../service/pessoas/pessoas.service';
import { NotificationService } from '../../service/notification/notification.service';
import { Pessoa } from '../../core/models/pessoa.interface';

describe('ConsultaPessoaComponent', () => {
  let component: ConsultaPessoaComponent;
  let fixture: ComponentFixture<ConsultaPessoaComponent>;
  let mockPessoasService: PessoasService;
  let mockNotificationService: NotificationService;

  const mockPessoa: Pessoa = {
    id: 1,
    nome: 'Pessoa Encontrada',
    cpf: '11111111111',
    sexo: 'Masculino',
    email: 'encontrado@email.com',
    telefone: '11999999999'
  };

  beforeEach(async () => {
    const pessoasServiceSpy = { buscarPessoaPorCpf: jest.fn() };
    const notificationServiceSpy = { showSuccess: jest.fn(), showError: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [ConsultaPessoaComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: PessoasService, useValue: pessoasServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaPessoaComponent);
    component = fixture.componentInstance;
    mockPessoasService = TestBed.inject(PessoasService);
    mockNotificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('deve ser criado e o formulário deve começar inválido', () => {
    expect(component).toBeTruthy();
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('não deve chamar o serviço de busca se o formulário for inválido', () => {
    component.buscarPessoa();
    expect(mockPessoasService.buscarPessoaPorCpf).not.toHaveBeenCalled();
  });

  describe('quando o formulário é válido', () => {
    const validCpf = '11111111111';

    beforeEach(() => {
      component.searchForm.setValue({ cpf: validCpf });
    });

    it('deve chamar o serviço, encontrar a pessoa e preencher a propriedade pessoaEncontrada', () => {
      (mockPessoasService.buscarPessoaPorCpf as jest.Mock).mockReturnValue(of(mockPessoa));
      component.buscarPessoa();

      expect(mockPessoasService.buscarPessoaPorCpf).toHaveBeenCalledWith(validCpf);
      expect(component.pessoaEncontrada).toEqual(mockPessoa);
      expect(mockNotificationService.showError).not.toHaveBeenCalled();
    });

    it('deve chamar o serviço, não encontrar a pessoa e chamar a notificação de erro', () => {
      (mockPessoasService.buscarPessoaPorCpf as jest.Mock).mockReturnValue(throwError(() => new Error('Pessoa não encontrada')));
      component.buscarPessoa();

      expect(mockPessoasService.buscarPessoaPorCpf).toHaveBeenCalledWith(validCpf);
      expect(component.pessoaEncontrada).toBeNull();
      expect(mockNotificationService.showError).toHaveBeenCalledWith('Pessoa não encontrada. Verifique o CPF e tente novamente.');
    });
  });
});