import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ delay: 500 }),
  ]
})
export class LoginComponent {

  readonly loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  })
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    try {
      const { username, password }: any = this.loginForm.value;
      console.log(this.loginForm.value);
      localStorage.setItem('RGAS_login','ok')
      this.router.navigate(['/admin']).then(()=>location.reload())

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
}
