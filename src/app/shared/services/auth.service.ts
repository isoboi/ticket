import { DestroyRef, inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { map } from 'rxjs'
import { StorageService } from "./storage.service";
import { LoginData } from "../models/auth/login-data";
import { LoginResult } from "../models/auth/login-result";
import { AuthEnum } from "../enums/auth.enum";
import { Store } from "@ngrx/store";
import { deleteUserAction, setUserAction } from "../../store/actions/user.action";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  storageService = inject(StorageService);
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  constructor() {
  }

  isAuthorized() {
    const user = this.storageService.getItem(AuthEnum.USER_DATA);
    this.store.dispatch(setUserAction({ user: user }, ));
    return !!user;
  }

  login(data: LoginData) {
    return this.http.post<LoginResult>('auth/login', data)
      .pipe(map(result => {
        this.storageService.setItem(AuthEnum.AUTH_TOKEN, result.access_token);
        this.storageService.setItem(AuthEnum.USER_DATA, result.user);
        return result.user;
      }));
  }

  logout() {
    this.storageService.removeItem(AuthEnum.AUTH_TOKEN);
    this.storageService.removeItem(AuthEnum.USER_DATA);
    this.store.dispatch(deleteUserAction());
    this.router.navigate(['/login'])
  }
}
