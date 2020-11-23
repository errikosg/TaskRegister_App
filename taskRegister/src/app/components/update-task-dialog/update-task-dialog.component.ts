import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.css']
})
export class UpdateTaskDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {title,startDate,endDate,product,description,evaluation,comments}: Task
  ) { 
      let sDate = new Date(startDate)
      let eDate: Date;
      if(endDate){
        // to keep eDate null if not given
        eDate= new Date(endDate)
      }
    
      this.form = fb.group({
      title: [title, [Validators.required, Validators.maxLength(255)]],
      startDate: [sDate, [Validators.required, Validators.maxLength(255)]],
      endDate: [eDate, Validators.maxLength(255)],
      product: [product, [Validators.required, Validators.maxLength(255)]],
      description: [description, [Validators.required, Validators.maxLength(1000)]],
      evaluation: [evaluation, [Validators.required, Validators.min(0), Validators.max(10)]],
      comments: [comments, Validators.maxLength(255)]
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
