import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBreadCrumbsComponentComponent } from './base-bread-crumbs-component.component';

describe('BaseBreadCrumbsComponentComponent', () => {
  let component: BaseBreadCrumbsComponentComponent;
  let fixture: ComponentFixture<BaseBreadCrumbsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseBreadCrumbsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseBreadCrumbsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
