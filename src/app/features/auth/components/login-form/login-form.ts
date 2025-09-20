import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
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

  public loginForm!: FormGroup;
  public isLoading = computed(() => this.authService.isLoading());

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
