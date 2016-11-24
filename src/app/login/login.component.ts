import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/index';

@Component({
  selector: 'app',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit{
  model: any = {};
  loading = false;
  formErrors: any[] = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(){
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/offices']);
        },
        error => {
          this.loading = false;
          this.formErrors = [];
          this.formErrors.push(error);
        });
  }
}
