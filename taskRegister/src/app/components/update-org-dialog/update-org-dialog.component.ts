import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Organization } from 'src/app/models/organization';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-update-org-dialog',
  templateUrl: './update-org-dialog.component.html',
  styleUrls: ['./update-org-dialog.component.css']
})
export class UpdateOrgDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateOrgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {name,startDate,endDate}: Organization
  ) { 

      let sDate = new Date(startDate)
      let eDate: Date;
      if(endDate){
        // to keep eDate null if not given
        eDate= new Date(endDate)
      }

      this.form = fb.group({
        name: [name, [Validators.required, Validators.maxLength(255)]],
        startDate: [sDate, [Validators.required, Validators.maxLength(255)]],
        endDate: [eDate, Validators.maxLength(255)]
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
