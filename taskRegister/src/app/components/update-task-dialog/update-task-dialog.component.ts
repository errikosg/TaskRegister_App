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
      title: [title, Validators.required],
      startDate: [sDate, Validators.required],
      endDate: [eDate],
      product: [product, Validators.required],
      description: [description, Validators.required],
      evaluation: [evaluation, Validators.required],
      comments: [comments]
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
