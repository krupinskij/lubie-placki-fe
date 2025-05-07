import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHeader } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lubie-placki-fe';
}
