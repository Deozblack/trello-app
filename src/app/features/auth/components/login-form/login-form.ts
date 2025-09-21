import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';
import { AlertService } from '../../../../shared/services/alert';

@Component({
  selector: 'app-login-form',
  imports: [RouterModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './login-form.html',
  styles: ``,
})
export class LoginForm {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  public formBuilder = inject(FormBuilder);
  public isLoading = computed(() => this.authService.isLoading());

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login$(email!, password!).subscribe({
      next: (response) => {
        if (response.error) {
          this.alertService.createAlert({
            icon: 'error',
            message: 'Credenciales inválidas',
            position: 'top-end',
          });
          return;
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.alertService.createAlert({
          icon: 'error',
          message: 'Error al iniciar sesión. Intenta de nuevo.',
          position: 'top-end',
        });
      },
    });
  }
}
