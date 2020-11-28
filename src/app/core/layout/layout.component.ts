import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getCurrentUser();
    if (!user.isInfluencer && !user.hasSelectedInfluencers) {
      this.router.navigate(['select-influencers'], { replaceUrl: true });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
