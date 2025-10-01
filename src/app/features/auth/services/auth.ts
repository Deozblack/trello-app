import { inject, Injectable, signal, computed } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase';
import { finalize, from, Observable, switchMap } from 'rxjs';
import { AuthTokenResponsePassword, User, Session, AuthResponse } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  // Signals for storing auth state
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(true);

  // Computed signal derived from currentUser
  isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    this.initAuthStateListener();
  }

  private initAuthStateListener(): void {
    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      this.handleAuthStateChange(session, event);
    });

    // Check initial session
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

    // Redirect automatically after a successful login
    if (event === 'SIGNED_IN' && user) {
      this.router.navigate(['/dashboard']);
    }
  }

  login$(email: string, password: string): Observable<AuthTokenResponsePassword> {
    this.isLoading.set(true);
    return from(this.supabaseService.client.auth.signInWithPassword({ email, password })).pipe(
      finalize(() => this.isLoading.set(false)),
    );
  }

  register$(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    this.isLoading.set(true);
    return from(
      this.supabaseService.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${environment.URL_APP}/login`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      }),
    ).pipe(
      switchMap((authResponse) => {
        // If registration was successful and we have a user, update their profile
        if (authResponse.data.user && !authResponse.error) {
          // Redirect to login page after successful registration
          this.router.navigate(['/login']);

          return this.updateUserProfile$(authResponse.data.user.id, firstName, lastName).pipe(
            // Return the original auth response after updating the profile
            switchMap(() => from(Promise.resolve(authResponse))),
          );
        }
        // If there's no user or an error, return the original response
        return from(Promise.resolve(authResponse));
      }),
      finalize(() => this.isLoading.set(false)),
    );
  }

  private updateUserProfile$(
    userId: string,
    firstName: string,
    lastName: string,
  ): Observable<unknown> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
        })
        .eq('id', userId),
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
