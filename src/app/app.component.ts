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
  items: SideItem[],
  access: string[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DCS';
  theme = false;
  profile :any
  mobileQuery!: MediaQueryList;

  fillerNav: SideItem[] = [
    {
      title: 'Master',
      icon: 'assets/img/icon_sidebar/master.png',
      path: '',
      access: ['admin', 'fullAdmin'],
      items: [
        {
          title: 'Machine',
          icon: 'assets/img/icon_sidebar/master_manage.png',
          path: 'admin/master_machine',
          items: [],
          access: ['']
        },
        {
          title: 'User',
          icon: 'assets/img/icon_sidebar/user_manage_icon.png',
          path: 'admin/master_manage',
          items: [],
          access: ['']
        },
        {
          title: 'Service',
          icon: 'assets/img/icon_sidebar/service.png',
          path: 'admin/master_service_type_option',
          items: [],
          access: ['']
        },
        {
          title: 'PM',
          icon: 'assets/img/icon_sidebar/PM.png',
          path: 'admin/master_pm',
          items: [],
          access: ['']
        },
      ]
    },
    {
      title: 'Engineer',
      icon: 'assets/img/icon_sidebar/engineer.png',
      path: '',
      access: ['admin', 'fullAdmin', 'engineer'],
      items: [
        {
          title: 'report',
          icon: 'assets/img/icon_sidebar/report.png',
          path: 'engineer/report',
          items: [],
          access: ['']
        },
        {
          title: 'PM Report',
          icon: 'assets/img/icon_sidebar/report.png',
          path: 'engineer/pm-report',
          items: [],
          access: ['']
        },
        {
          title: 'Library Search',
          icon: 'assets/img/icon_sidebar/search.png',
          path: 'engineer/library-search',
          items: [],
          access: ['']
        },
      ]
    },
    {
      title: 'Specialist',
      icon: 'assets/img/icon_sidebar/special1.png',
      path: '',
      access: ['admin', 'fullAdmin', 'special'],
      items: [
        {
          title: 'report',
          icon: 'assets/img/icon_sidebar/report.png',
          path: 'special/report',
          items: [],
          access: ['']
        },
        {
          title: 'PM Report',
          icon: 'assets/img/icon_sidebar/report.png',
          path: 'special/pm-report',
          items: [],
          access: ['']
        },
        {
          title: 'Library Search',
          icon: 'assets/img/icon_sidebar/search.png',
          path: 'special/library-search',
          items: [],
          access: ['']
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
    if (this.$local.getAuth() == 'admin') {

    }
    this.profile = this.$local.getProfile()



  }

  hide_for_profile() {

    return this.router.url == '/profile' ?
      false :
      true
  }


  checkLogin() {
    this.profile = this.$local.getProfile()
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
  onClickProfile() {
    this.router.navigate(['/profile']).then(() => location.reload())
  }
  onLogout() {
    this.$local.clear()
    this.router.navigate(['/login']).then(() => location.reload())
  }

  // todo checkAccess
  checkAccess(nav: SideItem) {
    if (nav.access.some((v: any) => v == this.$local.getAuth())) return true
    return false
  }
  // todo displayAccess
  displayAccess() {
    return this.$local.getAuth()
  }
}
