import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  private url = 'http://localhost:3000/orgs';
  getOrgs$: Subject<Organization[]>;
  getSingleOrg$: Subject<Organization>;
  // addSingleOrg$: Subject<Organization>;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.getOrgs$ = new Subject();
    this.getSingleOrg$ = new Subject();
    // this.addSingleOrg$ = new Subject();
  }

  // get all organizations
  getOrganizations(): Observable<Organization[]>{
    this.httpClient.get<Organization[]>(this.url).subscribe(val =>{
      this.getOrgs$.next(val)
    })
    return this.getOrgs$;
  }

  // get a single organization
  getSingleOrganization(org_id): Observable<Organization>{
    this.httpClient.get<Organization>(this.url+"/"+org_id).subscribe(val =>{
      this.getSingleOrg$.next(val)
    })
    return this.getSingleOrg$;
  }

  // add an organization
  addSingleOrganization(org:Organization): Observable<any>{
    // provide [name,starDate,endDate]

    return this.httpClient.post<any>(this.url, {name:org.name, startDate:org.startDate, endDate:org.endDate})
  }

  //update organization
  updateOrganization(org:Organization): Observable<any>{
    // provide [name,starDate,endDate]
    
    return this.httpClient.patch<any>(this.url+"/"+org.org_id, {name:org.name, startDate:org.startDate, endDate:org.endDate})
  }

  deleteOrganization(org_id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url+"/"+org_id);
  }
}
