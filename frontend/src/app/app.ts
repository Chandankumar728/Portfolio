import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentIndicatorComponent } from './shared/components/environment-indicator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnvironmentIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');
}
