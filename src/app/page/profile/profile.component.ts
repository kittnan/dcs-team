import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  edit: any = false
  edit_name: any = false
  edit_fname: any = false
  profile: any = {}

  password_check: any = {}

  constructor(
    private router: Router,
    private $user: HttpUsersService
  ) { }

  ngOnInit(): void {
    let data = JSON.parse(`${localStorage.getItem("DCS_profile")}`)
    this.profile = data
  }



  close() {
    this.router.navigate(['/']).then(() => location.reload())
  }



  cancel() {
    this.edit_name = false
    this.edit_fname = false
  }

  async confirm() {
    this.edit_name = false
    let update = await lastValueFrom(this.$user.Master_User_update(this.profile._id, { name: this.profile.name }))
    let updateLocal = localStorage.setItem("DCS_profile", JSON.stringify(this.profile))
    // this.profile
    this.cancel()
  }

  async confirm_p() {
    let check = await lastValueFrom(this.$user.Master_User_GetByCondition({ _id: this.profile._id, password: this.password_check.Current_P }))
    if (check.length == 0) {
      Swal.fire('The password is incorrect.', '', 'error')
    }

    if (check.length != 0) {
      if (this.password_check.New_P != this.password_check.Con_P) {
        Swal.fire("Passwords don't match", '', 'error')
      } else {
        setTimeout(async () => {
          let check = await lastValueFrom(this.$user.Master_User_update(this.profile._id, { password: this.password_check.New_P }))
          Swal.fire('Success', '', 'success').then(() => {
            this.edit = false
            this.password_check = {}
          })
        }, 200);
      }
    }

  }

  focus_input() {
    setTimeout(() => {
      let doo = document.getElementById("fname") as HTMLInputElement
      doo.focus()
    }, 20);
  }

}
