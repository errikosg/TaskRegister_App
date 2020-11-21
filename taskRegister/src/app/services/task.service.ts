import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:3000/tasks';
  getTasks$: Subject<Task[]>;       // demo
  getTasksByOrg$: Subject<Task[]>;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.getTasks$ = new Subject();
    this.getTasksByOrg$ = new Subject();
  }

  // get all tasks - demo
  getTasks(): Observable<Task[]>{
    this.httpClient.get<Task[]>(this.url).subscribe(val =>{
      this.getTasks$.next(val)
    })
    return this.getTasks$;
  }

  // get all tasks of a single organization
  getTasksByOrg(org_id): Observable<Task[]>{
    this.httpClient.get<Task[]>(this.url+"/by_org/"+org_id).subscribe(val =>{
      this.getTasksByOrg$.next(val)
    })
    return this.getTasksByOrg$;
  }

  // add a task
  addSingleTask(task:Task, org_id:number): Observable<any>{
    // provide [org_id,title,starDate,endDate,product,description,evaluation,comments]

    return this.httpClient.post(this.url, {
      org_id:org_id, title:task.title, startDate:task.startDate, endDate:task.endDate, 
      product:task.product, description:task.description, evaluation:task.evaluation, comments:task.comments
    })
  }

  //update task
  updateTask(task: Task): Observable<any>{
    // provide [title,starDate,endDate,product,description,evaluation,comments]
    
    return this.httpClient.patch<any>(this.url+"/"+task.task_id,
      {title: task.title, startDate: task.startDate, endDate: task.endDate,
      product: task.product, description: task.description, 
      evaluation:task.evaluation, comments: task.comments
    })
  }

  // delete a task
  deleteTask(task_id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url+"/"+task_id);
  }
}
