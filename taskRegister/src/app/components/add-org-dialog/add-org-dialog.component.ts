import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-org-dialog',
  templateUrl: './add-org-dialog.component.html',
  styleUrls: ['./add-org-dialog.component.css']
})
export class AddOrgDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOrgDialogComponent>
  ) { 
    this.form = fb.group({
      name: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: [""]
    });
   }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
