import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PessoaCardComponent } from './pessoa-card/pessoa-card.component';
import { MatSelectModule } from '@angular/material/select';

const components = [
  HeaderComponent,
  PessoaCardComponent
];

const modules = [
  CommonModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatSnackBarModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }