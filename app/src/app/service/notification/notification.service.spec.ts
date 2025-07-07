import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let snackBarRefSpy: MatSnackBarRef<any>;

  const afterDismissedSubject = new Subject<void>();

   beforeEach(() => {
    snackBarRefSpy = {
      afterDismissed: () => afterDismissedSubject.asObservable()
    } as any as MatSnackBarRef<any>;

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [NotificationService]
    });

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('deve abrir um snackbar de sucesso e adicionar a classe ao container', () => {
      const openSpy = jest.spyOn(snackBar, 'open').mockReturnValue(snackBarRefSpy);
      const addClassSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'add');
      
      service.showSuccess('Sucesso!');
      
      expect(addClassSpy).toHaveBeenCalledWith('success-snackbar');
      expect(openSpy).toHaveBeenCalledWith('Sucesso!', 'OK', expect.any(Object));
    });

    it('deve remover a classe de sucesso do container após o snackbar ser fechado', () => {
      jest.spyOn(snackBar, 'open').mockReturnValue(snackBarRefSpy);
      const removeClassSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'remove');
      
      service.showSuccess('Sucesso!');
      afterDismissedSubject.next();
      
      expect(removeClassSpy).toHaveBeenCalledWith('success-snackbar');
    });
  });

  describe('showError', () => {
    it('deve abrir um snackbar de erro e adicionar a classe ao container', () => {
      const openSpy = jest.spyOn(snackBar, 'open').mockReturnValue(snackBarRefSpy);
      const addClassSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'add');
      
      service.showError('Erro!');
      
      expect(addClassSpy).toHaveBeenCalledWith('error-snackbar');
      expect(openSpy).toHaveBeenCalledWith('Erro!', 'Fechar', expect.any(Object));
    });

    it('deve remover a classe de erro do container após o snackbar ser fechado', () => {
      jest.spyOn(snackBar, 'open').mockReturnValue(snackBarRefSpy);
      const removeClassSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'remove');

      service.showError('Erro!');
      afterDismissedSubject.next();

      expect(removeClassSpy).toHaveBeenCalledWith('error-snackbar');
    });
  });

  it('deve cancelar a inscrição em ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn((service as any).subscriptions, 'unsubscribe');
    service.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});