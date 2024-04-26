import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppInterceptor } from "./app.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { provideEffects } from "@ngrx/effects";
import { TicketsEffects } from "./store/effects/tickets.effects";
import { UserEffects } from "./store/effects/user.effects";
import { RegionsEffects } from "./store/effects/regions.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AppInterceptor,
        multi: true
    },
    provideStore(reducers, { metaReducers }),
    provideEffects(TicketsEffects, UserEffects, RegionsEffects),
]
};
