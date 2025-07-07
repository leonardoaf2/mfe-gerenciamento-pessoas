import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './page/home/home.component';
import { CadastraPessoaComponent } from './page/cadastra-pessoa/cadastra-pessoa.component';
import { ConsultaPessoaComponent } from './page/consulta-pessoa/consulta-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/service/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastraPessoaComponent,
    ConsultaPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 500 }
    )
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
