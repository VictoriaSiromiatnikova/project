import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/services/authentication.service";
import { securedPasswordValidator } from '../../shared/directories/secured-password.directive';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit{
  private user: User = new User();
  private userForm: FormGroup;
  private loading = false;
  private formErrors: {} = {
    name: '',
    password: '',
    common: []
  };
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.buildForm();
  }

  buildForm(){
    this.userForm = this.fb.group({
      'name': [this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ]
      ],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        securedPasswordValidator()
      ]]
    });
    this.userForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages =  this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  login(){
    this.loading = true;
    this.user = this.userForm.value;
    this.authenticationService.login(this.user.name, this.user.password)
      .subscribe(
        data => {
          this.router.navigate(['/offices']);
        },
        error => {
          this.loading = false;
          this.formErrors['common'] = [];
          this.formErrors['common'].push(error);
          this.formErrors['common'].push({message:'Test error message'});
        });
  }

  private validationMessages: {} = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 24 characters long.',
      'securedPassword':    'Password should contain at least 1 lower case letter, 1 upper case letter, 1 numeric character and 1 special character'
    }
  };
}
