import { Component } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [Logo, LoginForm],
  templateUrl: './login-page.html',
  styles: ``,
})
export default class LoginPage {}
