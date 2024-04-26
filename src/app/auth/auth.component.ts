import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TypedForm } from "../shared/models/common/typed-form";
import { LoginData } from "../shared/models/auth/login-data";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { loginAction } from "../store/actions/user.action";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIf,
    MatLabel,
    MatCard,
    MatInput,
    MatButton,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatCardTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  form: FormGroup<TypedForm<LoginData>>
  error: boolean;

  ngOnInit() {
    this.initForm()
  }

  public login() {
    this.error = false;
    this.store.select('user')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(user => {
          if (!user) {
            this.store.dispatch(loginAction({ data: this.form.getRawValue() }));
            return of([])
          }
          return user;
        })
      ).subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['/'])
        }
      },
      error: () => {
        this.form.reset();
        this.error = true;
      },
    });
  }

  private initForm() {
    this.form = new FormGroup<TypedForm<LoginData>>({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }
}
