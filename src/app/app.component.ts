import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LegendsListModule } from './legends-list/legends-list.module';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    LegendsListModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'brawlhalla Randomiser';

  public constructor(private themeService: ThemeService) {
    this.themeService.loadTheme('catppuccin-mocha');
  }

  switchTheme(themeName: string) {
    this.themeService.loadTheme(themeName);
  }
}
