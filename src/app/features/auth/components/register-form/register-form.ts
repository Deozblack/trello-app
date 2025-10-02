import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AlertService } from '../../../../shared/services/alert';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './register-form.html',
  styles: ``,
})
export class RegisterForm {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  public currentStep = signal(1);
  public isLoading = computed(() => this.authService.isLoading());

  // Computed properties for cleaner template
  public isFirstStep = computed(() => this.currentStep() === 1);
  public isSecondStep = computed(() => this.currentStep() === 2);

  public registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get firstNameControl() {
    return this.registerForm.get('firstName');
  }

  get lastNameControl() {
    return this.registerForm.get('lastName');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  private validateStep1Fields(): boolean {
    return !!(this.firstNameControl?.valid && this.lastNameControl?.valid);
  }

  nextStep(): void {
    if (!this.validateStep1Fields()) {
      this.firstNameControl?.markAsTouched();
      this.lastNameControl?.markAsTouched();
      return;
    }
    this.currentStep.set(2);
  }

  previousStep(): void {
    this.emailControl?.markAsUntouched();
    this.passwordControl?.markAsUntouched();
    this.currentStep.set(1);
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.authService.register$(firstName!, lastName!, email!, password!).subscribe({
      next: (response) => {
        if (response.error) {
          this.alertService.createAlert({
            icon: 'error',
            message: 'Error al registrarse',
            position: 'top-end',
          });
          return;
        }

        // Successful registration
        this.alertService.createAlert({
          icon: 'success',
          message: '¡Registro exitoso!',
          position: 'center',
        });

        // Reset form
        this.registerForm.reset();
        this.currentStep.set(1);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.alertService.createAlert({
          icon: 'error',
          message: 'Error al registrar el usuario. Intenta de nuevo.',
          position: 'top-end',
        });
      },
    });
  }
}
