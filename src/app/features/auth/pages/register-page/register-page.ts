import { Component } from '@angular/core';
import { RegisterForm } from '../../components/register-form/register-form';
import { AuthLayout } from '../../../../layouts/auth-layout/auth-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RegisterForm, AuthLayout, RouterModule],
  templateUrl: './register-page.html',
  styles: ``,
})
export default class RegisterPage {}
