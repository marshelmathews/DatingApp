import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [Nav,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);
  protected readonly title = signal('Dating app');

}
