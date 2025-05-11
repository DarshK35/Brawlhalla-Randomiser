import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeLinkId = 'app-theme';

  constructor() { }

  loadTheme(themeName: string) {
    const head = document.head;
    let themeLink = document.getElementById(this.themeLinkId) as HTMLLinkElement;

    if(themeLink) {
      themeLink.href = `assets/color-schemes/${themeName}.css`;
    } else {
      themeLink = document.createElement('link');
      themeLink.id = this.themeLinkId;
      themeLink.rel = 'stylesheet';
      themeLink.href = `assets/color-schemes/${themeName}.css`;
      head.appendChild(themeLink);
    }
  }
}
