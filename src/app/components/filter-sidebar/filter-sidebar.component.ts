import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
})
export class FilterSidebarComponent {
  minValue: number = 5000;
  maxValue: number = 58000;
  options: Options = {
    floor: 5000,
    ceil: 58000,
    translate: (value: number): string => {
      return `$${value.toLocaleString()}`;
    },
    getSelectionBarColor: () => 'red',
    getPointerColor: () => 'red',
  };

  filters: {
    attendance: { [key: string]: boolean };
    tuitionFee: [number, number];
    countries: { [key: string]: boolean };
    institutes: { [key: string]: boolean };
    languages: { [key: string]: boolean };
    levels: { [key: string]: boolean };
    types: { [key: string]: boolean };
    durations: { [key: string]: boolean };
  } = {
    attendance: {},
    tuitionFee: [5000, 58000],
    countries: {},
    institutes: {},
    languages: {},
    levels: {},
    types: {},
    durations: {},
  };
  searchCountry = '';
  searchInstitute = '';
  searchLanguage = '';

  attendanceOptions = [
    { label: 'On Campus', value: 'on-campus', count: 150 },
    { label: 'Hybrid', value: 'hybrid', count: 120 },
    { label: 'E-Learning', value: 'e-learning', count: 100 },
  ];

  levels = [
    { label: 'Associate', value: 'associate', count: 50 },
    { label: 'Undergraduate', value: 'undergraduate', count: 120 },
    { label: 'Post Graduate', value: 'post-graduate', count: 200 },
    { label: 'Masters', value: 'masters', count: 152 },
    { label: 'PHD', value: 'phd', count: 61 },
  ];
  types = [
    { label: 'Full Time', value: 'full-time', count: 20 },
    { label: 'Part Time', value: 'part-time', count: 61 },
  ];
  durations = [
    { label: '6-12months', value: 'associate', count: 20 },
    { label: '1-3years', value: 'undergraduate', count: 61 },
    { label: '3-5years', value: 'post-graduate', count: 200 },
  ];
  countries: any[] = [];
  institutes: any[] = [];
  languages: any[] = [];

  isExpanded: {
    attendance: boolean;
    tuitionFee: boolean;
    country: boolean;
    institutes: boolean;
    languages: boolean;
    types: boolean;
    levels: boolean;
    duration: boolean;
  } = {
    attendance: true,
    tuitionFee: true,
    country: true,
    institutes: true,
    languages: true,
    types: true,
    levels: true,
    duration: true,
  };

  showAllCountries = false;
  showAllInstitutes = false;
  showAllLanguages = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchInstitutes();
    this.fetchLanguages();
  }
  toggleSection(section: keyof typeof this.isExpanded) {
    this.isExpanded[section] = !this.isExpanded[section];
  }

  fetchCountries() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe((data) => {
        this.countries = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          count: Math.floor(Math.random() * 200),
        }));
      });
  }

  fetchInstitutes() {
    this.http.get<any>('https://api.openalex.org/institutions').subscribe(
      (response) => {
        console.log('Institutes API Response:', response);
        this.institutes = response.results.map(
          (institute: { id: any; display_name: any; name: any }) => ({
            id: institute.id,
            name: institute.display_name || institute.name,
            count: Math.floor(Math.random() * 150),
          })
        );
        console.log('Processed Institutes:', this.institutes);
      },
      (error) => console.error('Error fetching institutes:', error)
    );
  }

  fetchLanguages() {
    this.http.get<any[]>('https://phoible.org/languages').subscribe((data) => {
      this.languages = data.map((language) => ({
        id: language.id,
        name: language.name,
        count: Math.floor(Math.random() * 100),
      }));
    });
  }

  filteredCountries() {
    return this.countries
      .filter((c) =>
        c.name.toLowerCase().includes(this.searchCountry.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  filteredInstitutes() {
    return this.institutes
      .filter((i) =>
        i.name.toLowerCase().includes(this.searchInstitute.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  filteredLanguages() {
    return this.languages.filter((language) =>
      language.name.toLowerCase().includes(this.searchLanguage.toLowerCase())
    );
  }
}
