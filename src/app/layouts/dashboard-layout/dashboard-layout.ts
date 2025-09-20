import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth';

@Component({
  selector: 'app-dashboard-layout',
  imports: [],
  templateUrl: './dashboard-layout.html',
  styles: ``,
})
export default class DashboardLayout {
  private authService = inject(AuthService);

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  get currentUser() {
    return this.authService.currentUser();
  }
}
