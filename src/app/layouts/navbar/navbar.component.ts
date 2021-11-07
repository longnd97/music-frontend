import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  check = false;
  name: any;
  data: any;
  value?: string;
  searchForm?:any;
  songs?:any;


  constructor(private authService: AuthService,
              private router: Router,
              private songService:SongService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_name')) {
      this.check = true;
      this.data = localStorage.getItem('user_name');
      this.name = JSON.parse(this.data);
    }
  }

  logout() {
    if (confirm("Bạn có thực sự muốn đăng xuất")) {
      this.authService.logout().subscribe(res => {
        console.log(res)
        if (res.status === 'success') {
          localStorage.clear();
          this.router.navigate(['login']).then(() => {
            window.location.reload();
          });
        } else if (res.status === 'error') {
          alert(res.message);
        }
      })
    }
  }
}
