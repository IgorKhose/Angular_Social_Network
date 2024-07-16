import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { Profile } from './data/interfaces/profile.interface';

// https://www.figma.com/design/oGHQigWHYDVfYA7GPRi9q1/💫TIK-TALK?node-id=30-6072
// https://icherniakov.ru/yt-course/docs#/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tik-talk';

  profileService: ProfileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((val: Profile[]) => {this.profiles = val});
  }
}
