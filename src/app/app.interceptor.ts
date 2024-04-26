import { inject, Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { StorageService } from './shared/services/storage.service'
import { environment } from "../environments/environment";
import { AuthEnum } from "./shared/enums/auth.enum";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  storageService = inject(StorageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers,
      url = request.url

    if (!request.url.startsWith('https://')) {
      url = environment.apiUrl + url
      const token = this.storageService.getItem(AuthEnum.AUTH_TOKEN)

      if (token) {
        headers = headers.append('Authorization', `Bearer ${token}`)
      }
    }

    const resolvedReq = request.clone({
      headers,
      url,
    })

    return next.handle(resolvedReq)
  }
}
