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
        title: ["", [Validators.required, Validators.maxLength(255)]],
        startDate: ["", [Validators.required, Validators.maxLength(255)]],
        endDate: ["", Validators.maxLength(255)],
        product: ["", [Validators.required, Validators.maxLength(255)]],
        description: ["", [Validators.required, Validators.maxLength(1000)]],
        evaluation: ["", [Validators.required, Validators.min(0), Validators.max(10)]],
        comments: ["", Validators.maxLength(255)]
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
