import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() exibirVoltar: boolean = false;

  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigateByUrl('/home');
  }

  navigateToConsulta(): void {
    this.router.navigateByUrl('/consulta');
  }

  navigateToCadastro(): void {
    this.router.navigateByUrl('/cadastro');
  }
}
