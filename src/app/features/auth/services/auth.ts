import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase';
import { from, Observable } from 'rxjs';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);

  login$(email: string, password: string): Observable<AuthTokenResponsePassword> {
    return from(this.supabaseService.client.auth.signInWithPassword({ email, password }));
  }
}
