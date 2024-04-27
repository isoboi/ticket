import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatButton } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatInput } from "@angular/material/input";
import { PushPipe } from '@ngrx/component';
import {
  BaseBreadCrumbsComponentComponent
} from '../base-bread-crumbs-component/base-bread-crumbs-component.component';
import { Region } from "../shared/models/region/region";
import { User } from "../shared/models/user/user";
import { UserForm } from "../shared/models/user/user-form";
import { Observable } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { getAllRegionsAction } from "../store/actions/region.action";
import { updateAction } from "../store/actions/user.action";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatSuffix,
    RouterLink,
    MatInput,
    MatLabel,
    MatDatepickerActions,
    MatDatepickerCancel,
    MatDatepickerApply,
    PushPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends BaseBreadCrumbsComponentComponent implements OnInit {
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  form: FormGroup<UserForm>;
  regions: Observable<Region[]> = this.store.select('regions');

  constructor(activeRoute: ActivatedRoute) {
    super(activeRoute)
  }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  private getData(): void {
    this.store.dispatch(getAllRegionsAction());

    this.store.select('user')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.form.patchValue(user);
      });
  }

  initForm(): void {
    this.form = new FormGroup<UserForm>({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      date_of_birth: new FormControl(null, Validators.required),
      area_id: new FormControl(null, Validators.required),
    })
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return

    this.store.dispatch(updateAction({ user: this.form.getRawValue() as User }))
  }

}
