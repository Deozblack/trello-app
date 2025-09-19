import { Component, input } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';

@Component({
  selector: 'app-auth-layout',
  imports: [Logo],
  templateUrl: './auth-layout.html',
  styles: ``,
})
export class AuthLayout {
  public title = input.required<string>();
  public subTitle = input.required<string>();
}
