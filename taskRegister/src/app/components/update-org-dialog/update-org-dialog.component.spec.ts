import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrgDialogComponent } from './update-org-dialog.component';

describe('UpdateOrgDialogComponent', () => {
  let component: UpdateOrgDialogComponent;
  let fixture: ComponentFixture<UpdateOrgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrgDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
