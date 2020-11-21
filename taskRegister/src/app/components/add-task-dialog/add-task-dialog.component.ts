import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {

  form: FormGroup;
  org_name: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {name}: Organization
  ) { 
      this.org_name = name;

      this.form = fb.group({
        title: ["", Validators.required],
        startDate: ["", Validators.required],
        endDate: [""],
        product: ["", Validators.required],
        description: ["", Validators.required],
        evaluation: ["", Validators.required],
        comments: [""]
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
