import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    console.log(
      this.authService.isRegularUser(),
      this.authService.isInfluencer()
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
