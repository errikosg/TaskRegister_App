import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

import { Task } from '../../models/task';
import { Organization } from 'src/app/models/organization';
import { TaskService } from 'src/app/services/task.service';
import { OrgService } from 'src/app/services/org.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateTaskDialogComponent } from '../update-task-dialog/update-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService,
    private orgService: OrgService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private _snackbar: MatSnackBar
  ) { 
      this.getCurrentOrg();
   }

  tasklist: Task[];
  curr_org: Organization;
  org_id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
    // get the tasklist of given organization
    this.taskService.getTasksByOrg(this.org_id).subscribe(data => {
      this.tasklist = data;
    })
  }

  getCurrentOrg(): void {
    // get the current company
    this.orgService.getSingleOrganization(this.org_id).subscribe(data => {
      this.curr_org = data[0];
    })
  }

  goBack(): void {
    this.location.back();
  }

  scrollTop(): void {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 160); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  getColor(e): string {
    e = e*10;
    let G = Math.round((255 * e) / 100)
    let R = Math.round((255 * (100 - e)) / 100)
    let B = 0
    return "rgb("+R+","+G+","+B+")"
  }

  openAddTaskDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";

    // we have current org!
    dialogConfig.data = {
      name: this.curr_org.name
    }

    const dialogRef = this.dialog.open(AddTaskDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        if(result){
          // add new Organization
          let new_task: Task;
          let curr_org_id = this.curr_org.org_id

          new_task = {
            task_id:null, org_id:curr_org_id, title:result.title,
            startDate:this.datepipe.transform(result.startDate, 'MM/dd/yyyy'), 
            endDate:this.datepipe.transform(result.endDate, 'MM/dd/yyyy'),
            product:result.product, description:result.description, evaluation:result.evaluation,
            comments: result.comments
          }
          console.log(new_task)
          this.taskService.addSingleTask(new_task, curr_org_id).subscribe(data =>{
            console.log(data)
            // handle response
            if(data.code !== 200){
              let sbar_error = 'Task not added: ' + data.status;
              this._snackbar.open(sbar_error, null, {
                duration: 2000
              });
            }
            else{
              this.getTaskList();                       //refresh
              this._snackbar.open('Task added', null, {
                duration: 2000
              });
            }
          })
        }
    });
  }

  openUpdateTaskDialog(task: Task): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";

    // we have current org --> this.curr_org
    dialogConfig.data = {
      title: task.title, startDate: task.startDate, endDate: task.endDate,
      product: task.product, description: task.description, 
      evaluation:task.evaluation, comments: task.comments
    }

    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        // Update the task
        task = {task_id:task.task_id, org_id:task.org_id, title:result.title,
          startDate:this.datepipe.transform(result.startDate, 'MM/dd/yyyy'), 
          endDate:this.datepipe.transform(result.endDate, 'MM/dd/yyyy'),
          product:result.product, description:result.description, evaluation:result.evaluation,
          comments: result.comments
        };
        console.log(task)
        this.taskService.updateTask(task).subscribe(data =>{
          console.log(data)
          
          // handle response
          if(data.code !== 200){
            let sbar_error = 'Task not updated: ' + data.status;
            this._snackbar.open(sbar_error, null, {
              duration: 2000
            });
          }
          else{
            this.getTaskList();                       //refresh
            this._snackbar.open('Task updated', null, {
              duration: 2000
            });
          }
        })
      })
  }

  deleteTask(task: Task): void{
    console.log(task)
    // open dialog to make sure of the deletion
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(ConfirmDeletionComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result && result.delete===true){
          this.taskService.deleteTask(task.task_id).subscribe(data =>{
            console.log(data)

            //refresh
            this.getTaskList();
          })
        }
    });
  }
}
