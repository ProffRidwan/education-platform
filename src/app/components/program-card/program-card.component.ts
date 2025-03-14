import { Component, Input, Output, EventEmitter,  inject } from '@angular/core';
import { Program } from 'src/app/models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss']
})
export class ProgramCardComponent {
  @Input() program!: Program;
  programService : ProgramService = inject(ProgramService);

  constructor() {}

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.programService.toggleFavorite(this.program.id);
  }
}
