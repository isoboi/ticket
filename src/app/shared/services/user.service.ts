import { inject, Injectable } from '@angular/core'
import { User } from "../models/user/user";
import { BaseCrudService } from "./base-crud.service";
import { AuthEnum } from "../enums/auth.enum";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseCrudService<User> {
  protected override path = 'users/profile'
  storageService = inject(StorageService);

  update(user: User) {
    this.storageService.setItem(AuthEnum.USER_DATA, user);
    return this.http.patch(`users/update`, user)
  }
}
