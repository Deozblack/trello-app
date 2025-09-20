import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';
import { AlertService } from '../../../../shared/services/alert';

@Component({
  selector: 'app-login-form',
  imports: [RouterModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './login-form.html',
  styles: ``,
})
export class LoginForm implements OnInit {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('omar@correo.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login$(email, password).subscribe({
      next: (response) => {
        if (response.error) {
          this.alertService.createAlert({
            icon: 'error',
            message: 'Credenciales inválidas',
            position: 'top-end',
          });
          return;
        }
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  // Getters para facilitar el acceso a los controles en el template
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
