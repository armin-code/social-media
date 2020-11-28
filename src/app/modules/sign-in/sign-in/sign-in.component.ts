import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INFLUENCER } from './../../../app.constants';
import { AuthService } from './../../../core/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean;
  hide: boolean = true;
  isInfluencer = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  ngOnInit() {
    this.createForm();
    this.getUserType();
  }

  getUserType(): void {
    this.isInfluencer = this.route.snapshot.params.type === INFLUENCER;
  }
  private createForm(): void {
    this.formGroup = this.fb.group({
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      username: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.authService.login(this.formGroup.value).subscribe(
        data => {
          this.isLoading = false;
          this.authService.setSession(data);
          if (!data.user.isInfluencer && !data.user.hasSelectedInfluencers) {
            this.router.navigate(['select-influencers'], { replaceUrl: true });
            return;
          }
          this.router.navigate([''], { replaceUrl: true });
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  showPassword() {
    this.hide = !this.hide;
  }
}
