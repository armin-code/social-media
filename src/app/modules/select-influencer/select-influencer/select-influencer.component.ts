import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/service/auth.service';
import { FollowingsService } from './../../../services/followings/followings.service';

@Component({
  selector: 'app-select-influencer',
  templateUrl: './select-influencer.component.html',
  styleUrls: ['./select-influencer.component.scss']
})
export class SelectInfluencerComponent implements OnInit {
  page = 1;
  data;

  constructor(
    private followingsService: FollowingsService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isInfluencer()) {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.followingsService.getInfluencerList(this.page).subscribe(response => {
      this.data = response.body;
    });
  }
}
