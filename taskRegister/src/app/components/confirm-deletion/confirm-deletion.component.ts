import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent implements OnInit {

  // dialog to get confirmation before deleting org/task

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeletionComponent>
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.dialogRef.close({delete:true});
  }

  close() {
    this.dialogRef.close();
  }

}
