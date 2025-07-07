import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: Router;

  beforeEach(async () => {
    const routerSpy = {
      navigateByUrl: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar navigateToHome ao clicar no botão de voltar', () => {
    component.exibirVoltar = true;
    fixture.detectChanges();
    const navigateSpy = jest.spyOn(component, 'navigateToHome');
    const backButton = fixture.debugElement.query(By.css('button[aria-label="Voltar para home"]'));
    backButton.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('deve chamar navigateToConsulta ao clicar no botão de consulta', () => {
    const navigateSpy = jest.spyOn(component, 'navigateToConsulta');
    const consultaButton = fixture.debugElement.query(By.css('a[aria-label="Consultar pessoas"]'));
    consultaButton.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('deve chamar navigateToCadastro ao clicar no botão de cadastro', () => {
    const navigateSpy = jest.spyOn(component, 'navigateToCadastro');
    const cadastroButton = fixture.debugElement.query(By.css('a[aria-label="Cadastrar nova pessoa"]'));
    cadastroButton.triggerEventHandler('click', null);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('deve navegar para /home quando navigateToHome é chamado', () => {
    component.navigateToHome();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('deve navegar para /consulta quando navigateToConsulta é chamado', () => {
    component.navigateToConsulta();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/consulta');
  });

  it('deve navegar para /cadastro quando navigateToCadastro é chamado', () => {
    component.navigateToCadastro();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/cadastro');
  });

  describe('Exibição Condicional do Título', () => {
    it('deve exibir "Gestão de Pessoas" quando exibirVoltar for false', () => {
      component.exibirVoltar = false;
      fixture.detectChanges();
      const titleElement = fixture.debugElement.query(By.css('.title'));
      const backButton = fixture.debugElement.query(By.css('button[aria-label="Voltar para home"]'));
      
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent).toContain('Gestão de Pessoas');
      expect(backButton).toBeFalsy();
    });
  });
});