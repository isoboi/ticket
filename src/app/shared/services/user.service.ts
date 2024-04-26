import { inject, Injectable } from '@angular/core'
import moment from 'moment/moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthEnum } from '../enums/auth.enum';
import { User } from "../models/user/user";
import { BaseCrudService } from "./base-crud.service";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseCrudService<User> {
  storageService = inject(StorageService)
  update(user: User): Observable<User> {
    let newUser: User = user;
    if (user?.date_of_birth) {
      newUser = {
        ...user,
        date_of_birth: moment(user.date_of_birth).format('YYYY-MM-DD')
      }
    }
    return this.http.patch<{ success: boolean }>(`users/update`, newUser)
      .pipe(map(result => {
        if (result.success) {
          return {
            ...this.storageService.getItem(AuthEnum.USER_DATA),
            ...newUser
          };
        }
        return this.storageService.getItem(AuthEnum.USER_DATA);
      }))
  }
}
