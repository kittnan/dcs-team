import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpUsersService } from './http/http-users.service';
import { LocalStorageService } from './service/local-storage.service';
interface SideItem {
  title: string,
  icon: string,
  path: string,
  items: SideItem[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DCS';
  theme = false;

  mobileQuery!: MediaQueryList;

  fillerNav: SideItem[] = [
    {
      title: 'Master',
      icon: 'groups',
      path: '',
      items: [
        {
          title: 'customer',
          icon: 'person_add_alt',
          path: 'admin/customer',
          items: []
        },
        {
          title: 'master_machine',
          icon: 'person_add_alt',
          path: 'admin/master_machine',
          items: []
        },
        {
          title: 'master_manage',
          icon: 'person_add_alt',
          path: 'admin/master_manage',
          items: []
        },


      ]
    },


  ]
  login: boolean = false
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private auth: AuthService,
    private $user: HttpUsersService,
    private $local: LocalStorageService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

  checkLogin() {
    return this.$local.getAuth()
  }


  toggleTheme() {
    this.theme = !this.theme;
    this.setTheme(this.theme);
  }
  private setTheme(darkTheme: boolean) {
    const lightClass = 'theme--light';
    const darkClass = 'theme--dark';
    const removeClass = darkTheme ? lightClass : darkClass;
    const addClass = darkTheme ? darkClass : lightClass;
    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onLogout() {
    this.$local.clear()
    this.router.navigate(['/login']).then(() => location.reload())
  }
}
