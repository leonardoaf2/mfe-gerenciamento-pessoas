import { Component, Input } from '@angular/core';
import { Pessoa } from '../../core/models/pessoa.interface';

@Component({
  selector: 'app-pessoa-card',
  templateUrl: './pessoa-card.component.html',
  styleUrls: ['./pessoa-card.component.scss']
})
export class PessoaCardComponent {

  @Input() pessoa!: Pessoa;

}
