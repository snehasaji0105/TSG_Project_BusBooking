import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface registerContext {
  name: string;
  email: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}
  // register(context: registerContext) {
  //   return this.http.post('auth/register', context);
  // }
  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  // login(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   const data = {
  //     username: context.username,
  //     token: '123456',
  //   };
  //   this.credentialsService.setCredentials(data, context.remember);
  //   return of(data);
  // }

  login(requestObj: LoginContext): Observable<any> {
    console.log('requestObj', requestObj);
    // Replace by proper authentication call
    return this.http.post('/auth/login', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  register(requestObj: registerContext): Observable<any> {
    console.log('requestObj', requestObj);
    // Replace by proper authentication call
    return this.http.post('/auth/register', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.clearCredentials();
    return of(true);
  }
}
