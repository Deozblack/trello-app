import { inject, Injectable, signal, computed } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase';
import { finalize, from, Observable } from 'rxjs';
import { AuthTokenResponsePassword, User, Session, AuthResponse } from '@supabase/supabase-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  // Signals para el estado de autenticación
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(true);

  // Computed signal derivado del currentUser
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    this.initAuthStateListener();
  }

  private initAuthStateListener(): void {
    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      this.handleAuthStateChange(session, event);
    });

    // Verificar sesión inicial
    this.checkInitialSession();
  }

  private async checkInitialSession(): Promise<void> {
    try {
      const {
        data: { session },
      } = await this.supabaseService.client.auth.getSession();
      this.handleAuthStateChange(session);
    } catch (error) {
      console.error('Error checking initial session:', error);
      this.handleAuthStateChange(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  private handleAuthStateChange(session: Session | null, event?: string): void {
    const user = session?.user ?? null;
    this.currentUser.set(user);

    // Redireccionar automáticamente después de un login exitoso
    if (event === 'SIGNED_IN' && user) {
      this.router.navigate(['/dashboard']);
    }
  }

  login$(email: string, password: string): Observable<AuthTokenResponsePassword> {
    this.isLoading.set(true);
    return from(this.supabaseService.client.auth.signInWithPassword({ email, password })).pipe(
      finalize(() => this.isLoading.set(false))
    );
  }

  register$(email: string, password: string): Observable<AuthResponse> {
    this.isLoading.set(true);
    return from(this.supabaseService.client.auth.signUp({ email, password })).pipe(
      finalize(() => this.isLoading.set(false))
    );
  }

  async logout(): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.supabaseService.client.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async getSession(): Promise<Session | null> {
    const {
      data: { session },
    } = await this.supabaseService.client.auth.getSession();
    return session;
  }
}
