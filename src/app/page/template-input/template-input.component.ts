import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, lastValueFrom, of, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-template-input',
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss']
})
export class TemplateInputComponent implements OnInit {

  options = [
    {
      itemName: 'aaa',
      itemValue: 'frghjk'
    }
  ]
  constructor(
    private http: HttpClient,
    private $local: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const payload = {
      name: "boat",
      pass: 'bvo'
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:'Basic ' + btoa(`${JSON.stringify(payload)}`)
    })
    const access: any = await lastValueFrom(this.http.post(`${environment.API}/auth/login`, {}, {headers}))
    if (access) {
      this.$local.setRefreshToken(access.refresh_token)
      this.$local.setToken(access.access_token)
    }
  }
  async onGet() {
    const access: any = await lastValueFrom(this.http.get(`${environment.API}/users`))
    console.log("🚀 ~ access:", access)
  }


}
