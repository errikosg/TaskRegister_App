import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgDialogComponent } from './add-org-dialog.component';

describe('AddOrgDialogComponent', () => {
  let component: AddOrgDialogComponent;
  let fixture: ComponentFixture<AddOrgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrgDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
