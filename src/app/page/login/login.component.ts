import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { environment } from 'src/environments/environment';

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

  userLogin: any
  constructor(
    private router: Router,
    private http: HttpClient,
    private $local: LocalStorageService
  ) { }

  ngOnInit(): void {
    try {
      if (this.$local.getProfile()) {
        this.userLogin = this.$local.getProfile()
        if (this.$local.getAuth()) {
          this.goLink(this.$local.getAuth())
        }
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async onLogin() {
    const payload = this.loginForm.value
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${JSON.stringify(payload)}`)
    })
    const access: any = await lastValueFrom(this.http.post(`${environment.API}/auth/login`, {}, { headers }))
    if (access) {
      this.$local.setRefreshToken(access.refresh_token)
      this.$local.setToken(access.access_token)
      this.userLogin = access.profile
      this.$local.setProfile(JSON.stringify(access.profile))
      if (this.userLogin.permission && this.userLogin.permission.length === 1) {
        this.goLink(this.userLogin.permission[0])
      }
    }
  }

  goLink(auth: any) {
    this.$local.setAuth(auth)
    if (auth == 'admin') {
      this.router.navigate(['admin'])
    } else
      if (auth == 'engineer') {
        this.router.navigate(['engineer'])
      } else
        if (auth == 'special') {
          this.router.navigate(['special'])
        } else
          if (auth == 'store') {
            this.router.navigate(['store'])
          } else
            if (auth == 'full-admin') {
              this.router.navigate(['full-admin'])
            } else {
              alert('Not access')
              this.$local.clear()
              this.router.navigate(['/']).then(() => location.reload())
            }

  }

  logout() {
    this.$local.clear()
    this.router.navigate(['/login']).then(() => location.reload())
  }
}
