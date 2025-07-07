import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: Router;

  beforeEach(async () => {
    const routerSpy = {
      navigateByUrl: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o router para /cadastro quando navigateToCadastro é chamado', () => {
    component.navigateToCadastro();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/cadastro');
  });

  it('deve chamar o router para /consulta quando navigateToConsulta é chamado', () => {
    component.navigateToConsulta();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/consulta');
  });

  it('deve chamar navigateToCadastro quando o botão de cadastro é clicado', () => {
    const navigateSpy = jest.spyOn(component, 'navigateToCadastro');
    const cadastroButton = fixture.debugElement.query(By.css('button[aria-label="Cadastrar nova pessoa"]'));
    cadastroButton.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('deve chamar navigateToConsulta quando o botão de consulta é clicado', () => {
    const navigateSpy = jest.spyOn(component, 'navigateToConsulta');
    const consultaButton = fixture.debugElement.query(By.css('button[aria-label="Consultar pessoa"]'));
    consultaButton.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalled();
  });
});