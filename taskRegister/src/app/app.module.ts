import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddOrgDialogComponent } from './components/add-org-dialog/add-org-dialog.component';
import { UpdateOrgDialogComponent } from './components/update-org-dialog/update-org-dialog.component';
import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { UpdateTaskDialogComponent } from './components/update-task-dialog/update-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    TaskListComponent,
    AddOrgDialogComponent,
    UpdateOrgDialogComponent,
    ConfirmDeletionComponent,
    AddTaskDialogComponent,
    UpdateTaskDialogComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  entryComponents: [
    AddOrgDialogComponent,
    UpdateOrgDialogComponent,
    ConfirmDeletionComponent,
    AddTaskDialogComponent,
    UpdateTaskDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
