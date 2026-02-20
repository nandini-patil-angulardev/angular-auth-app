import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.authState.asObservable();

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'fake-jwt-token');
      this.authState.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}