import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToCadastro(): void {
    this.router.navigateByUrl('/cadastro');
  }

  navigateToConsulta(): void {
    this.router.navigateByUrl('/consulta');
  }
}