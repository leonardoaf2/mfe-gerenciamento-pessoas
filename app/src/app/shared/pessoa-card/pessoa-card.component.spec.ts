import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

import { PessoaCardComponent } from './pessoa-card.component';
import { Pessoa } from '../../core/models/pessoa.interface';
describe('PessoaCardComponent', () => {
  let component: PessoaCardComponent;
  let fixture: ComponentFixture<PessoaCardComponent>;

  const mockPessoa: Pessoa = {
    id: 1,
    nome: 'Pessoa de Teste',
    cpf: '123.456.789-00',
    email: 'teste@email.com',
    sexo: 'Outro',
    telefone: '(99) 99999-9999'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PessoaCardComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatListModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaCardComponent);
    component = fixture.componentInstance;
    component.pessoa = mockPessoa;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir os dados da pessoa no template', () => {
    const nomeElement: HTMLElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const emailElement: HTMLElement = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));

    expect(nomeElement.textContent).toContain(mockPessoa.nome);
    expect(emailElement.textContent).toContain(mockPessoa.email);
    expect(listItems[0].nativeElement.textContent).toContain(mockPessoa.cpf);
    expect(listItems[1].nativeElement.textContent).toContain(mockPessoa.sexo);
    expect(listItems[2].nativeElement.textContent).toContain(mockPessoa.telefone);
  });
});