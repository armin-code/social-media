import { INFLUENCER, REGULAR } from './../../../app.constants';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { convert } from 'src/app/shared/utils/date-convert';
import { AuthService } from './../../../core/service/auth.service';
import { SingUpService } from './../../../services/sing-up/sing-up.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  password: string;
  isLoading: boolean;
  hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    private singUpService: SingUpService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  ngOnInit() {
    this.createForm();
  }
  private createForm(): void {
    this.formGroup = this.fb.group({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,})')
        ]
      }),
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      username: new FormControl('', { validators: [Validators.required] }),
      dateOfBirth: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const registrationData = { ...this.formGroup.value };
      registrationData.dateOfBirth = convert(registrationData.dateOfBirth);
      this.singUpService.signUp(registrationData).subscribe(
        data => {
          this.isLoading = false;
          this.router.navigate([`sign-in/${data.body.isInfluencer ? INFLUENCER : REGULAR}`], { replaceUrl: true });
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  showPassword(): void {
    this.hide = !this.hide;
  }
}
