import { DestroyRef, inject, Injectable } from '@angular/core'
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRouteSnapshot, Router, RoutesRecognized } from "@angular/router";
import { Breadcrumb } from "../models/breadcrumb/breadcrumb";

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  routeData: Breadcrumb[];

  getRouteData() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data instanceof RoutesRecognized) {
          this.routeData = this.renderBreadcrumb(data.state.root.firstChild.firstChild)
        }
      });
  }

  renderBreadcrumb(route: ActivatedRouteSnapshot): Breadcrumb[] {
    let routeData: Breadcrumb[] = [];
    route?.data['breadcrumbs']?.forEach((breadcrumb: string) => {
      if (breadcrumb === 'profile') {
        routeData.push({
          title: 'Профиль',
          link: 'profile'
        });
      }
      if (breadcrumb === 'home') {
        routeData.push({
          title: 'Главная',
          link: 'home'
        });
      }
      if (breadcrumb === 'tickets') {
        routeData.push({
          title: 'Тикеты',
          link: 'tickets'
        });
      }
      if (breadcrumb === 'ticket' && route.params['id']) {
        const basePath = route.routeConfig.path.split(':id')[0]
        routeData.push({
          title: 'Тикет #' + route.params['id'],
          link: basePath + route.params['id']
        });
      }
    })
    return routeData;
  }
}
