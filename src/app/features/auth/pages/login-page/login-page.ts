import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthLayout } from '../../../../layouts/auth-layout/auth-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, AuthLayout, RouterModule],
  templateUrl: './login-page.html',
  styles: ``,
})
export default class LoginPage {}
