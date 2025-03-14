import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent {
program?: Program;
route: ActivatedRoute = inject(ActivatedRoute);
programService: ProgramService = inject(ProgramService);
 
constructor(
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.programService.getProgram(id).subscribe(program => {
        this.program = program;
      });
    }
  });
}

toggleFavorite(): void {
  if (this.program) {
    this.programService.toggleFavorite(this.program.id);
    this.program.isFavorite = !this.program.isFavorite;
  }
}
}
