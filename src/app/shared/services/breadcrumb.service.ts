import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Breadcrumbs, Path } from '../constants';
import { Breadcrumb } from "../models/breadcrumb/breadcrumb";

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  router = inject(Router);
  routeData: Breadcrumb[];

  renderBreadcrumb(route: ActivatedRouteSnapshot): Breadcrumb[] {
    let routeData: Breadcrumb[] = [];
    route?.data['breadcrumbs']?.forEach((breadcrumb: string) => {
      const routeDataItem = this.getRouteDataItem(breadcrumb, route);
      if (routeDataItem) {
        routeData.push(routeDataItem);
      }
    })
    return routeData
  }

  private getRouteDataItem(breadcrumb: string, route: ActivatedRouteSnapshot) {
    const breadcrumbsData = (Breadcrumbs as any)[breadcrumb];

    if (breadcrumbsData) {
      return breadcrumbsData;
    }

    if (breadcrumb === Path.ticket && route.params['id']) {
      const basePath = route.routeConfig.path.split(':id')[0]
      return {
        title: 'Тикет #' + route.params['id'],
        link: basePath + route.params['id']
      };
    }

    return;
  }
}
