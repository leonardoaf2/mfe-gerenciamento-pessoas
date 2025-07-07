import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { CadastraPessoaComponent } from './cadastra-pessoa.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PessoasService } from '../../service/pessoas/pessoas.service';
import { NotificationService } from '../../service/notification/notification.service';
import { Pessoa } from '../../core/models/pessoa.interface';

describe('CadastraPessoaComponent', () => {
  let component: CadastraPessoaComponent;
  let fixture: ComponentFixture<CadastraPessoaComponent>;
  let mockPessoasService: PessoasService;
  let mockNotificationService: NotificationService;

  beforeEach(async () => {
    const pessoasServiceSpy = { cadastrarPessoa: jest.fn() };
    const notificationServiceSpy = { showSuccess: jest.fn(), showError: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [CadastraPessoaComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: PessoasService, useValue: pessoasServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastraPessoaComponent);
    component = fixture.componentInstance;
    mockPessoasService = TestBed.inject(PessoasService);
    mockNotificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('deve ser criado e o formulário deve começar inválido', () => {
    expect(component).toBeTruthy();
    expect(component.cadastroForm.valid).toBeFalsy();
  });

  it('não deve chamar o serviço de cadastro se o formulário for inválido', () => {
    component.cadastrarPessoa();
    expect(mockPessoasService.cadastrarPessoa).not.toHaveBeenCalled();
    expect(mockNotificationService.showSuccess).not.toHaveBeenCalled();
  });

  it('deve marcar todos os campos como "touched" se o formulário inválido for submetido', () => {
    const markAsTouchedSpy = jest.spyOn(component.cadastroForm, 'markAllAsTouched');
    component.cadastrarPessoa();
    expect(markAsTouchedSpy).toHaveBeenCalled();
  });

  describe('quando o formulário é válido e o cadastro é bem-sucedido', () => {
    const mockPessoa: Pessoa = {
      nome: 'Pessoa Teste',
      cpf: '12345678901',
      sexo: 'outro',
      email: 'teste@email.com',
      telefone: '1234567890'
    };

    it('deve chamar o serviço, a notificação de sucesso e resetar o formulário', () => {
      component.cadastroForm.setValue(mockPessoa);
      (mockPessoasService.cadastrarPessoa as jest.Mock).mockReturnValue(of({ ...mockPessoa, id: 1 }));
      const resetSpy = jest.spyOn(component.cadastroForm, 'reset');
      component.cadastrarPessoa();
      expect(mockPessoasService.cadastrarPessoa).toHaveBeenCalledWith(mockPessoa);
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Pessoa cadastrada com sucesso!');
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('quando o formulário é válido mas o cadastro falha', () => {
    beforeEach(() => {
      component.cadastroForm.setValue({
        nome: 'Pessoa Teste',
        cpf: '12345678901',
        sexo: 'outro',
        email: 'teste@email.com',
        telefone: '1234567890'
      });
      (mockPessoasService.cadastrarPessoa as jest.Mock).mockReturnValue(throwError(() => new Error('Erro de API')));
      component.cadastrarPessoa();
    });

    it('deve chamar a notificação de erro', () => {
      expect(mockNotificationService.showError).toHaveBeenCalledWith('Ocorreu um erro ao cadastrar a pessoa.');
    });

    it('não deve resetar o formulário', () => {
      const resetSpy = jest.spyOn(component.cadastroForm, 'reset');
      component.cadastrarPessoa();
      expect(resetSpy).not.toHaveBeenCalled();
    });
  });
});