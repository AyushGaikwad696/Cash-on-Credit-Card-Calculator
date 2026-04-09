import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PwaService } from './core/services/pwa.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private readonly pwaService: PwaService) {
    void this.pwaService;
  }
}
