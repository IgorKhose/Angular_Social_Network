import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// https://www.figma.com/design/oGHQigWHYDVfYA7GPRi9q1/💫TIK-TALK?node-id=30-6072
// https://icherniakov.ru/yt-course/docs#/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tik-talk';
}
