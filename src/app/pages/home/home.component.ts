import { Component, inject } from '@angular/core';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  programs: Program[] = [];
  activeTab: 'saved' | 'applied' = 'saved';
  viewMode: 'grid' | 'list' = 'grid';
  searchTerm: string = '';
  sortOption: string = 'Popularity';

  programService: ProgramService = inject(ProgramService);

  constructor() {}

  ngOnInit(): void {
    this.programService.getPrograms().subscribe((programs) => {
      this.programs = programs;
    });
  }

  setActiveTab(tab: 'saved' | 'applied'): void {
    this.activeTab = tab;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
}
