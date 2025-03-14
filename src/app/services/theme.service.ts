import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();
  constructor() {

    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.darkMode.next(savedTheme === 'true');
      this.applyTheme(savedTheme === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.next(prefersDark);
      this.applyTheme(prefersDark);
    }
  }
  
  toggleDarkMode(): void {
    const newValue = !this.darkMode.value;
    this.darkMode.next(newValue);
    localStorage.setItem('darkMode', newValue.toString());
    this.applyTheme(newValue);
  }
  
  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
