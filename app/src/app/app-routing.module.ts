import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ConsultaPessoaComponent } from './page/consulta-pessoa/consulta-pessoa.component';
import { CadastraPessoaComponent } from './page/cadastra-pessoa/cadastra-pessoa.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaPessoaComponent },
  { path: 'cadastro', component: CadastraPessoaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }