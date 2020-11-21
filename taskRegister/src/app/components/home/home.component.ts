import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { OrgService } from 'src/app/services/org.service';
import { AddOrgDialogComponent } from 'src/app/components/add-org-dialog/add-org-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common'
import { UpdateOrgDialogComponent } from '../update-org-dialog/update-org-dialog.component';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orgs: Organization[];

  constructor(
    private orgService: OrgService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getOrgs();
  }

  getOrgs() {
    this.orgService.getOrganizations().subscribe(data => {
      this.orgs = data;
    })
  }

  openAddOrgDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "50%";

    const dialogRef = this.dialog.open(AddOrgDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        if(result){
          // add new Organization
          let new_org: Organization;
          new_org = {org_id:null, name:result.name,
                      startDate:this.datepipe.transform(result.startDate, 'MM/dd/yyyy'), 
                      endDate:this.datepipe.transform(result.endDate, 'MM/dd/yyyy')};
          this.orgService.addSingleOrganization(new_org).subscribe(data =>{
            console.log(data);

            // refresh organization list
            this.getOrgs();
            this._snackbar.open('Organization added', null, {
              duration: 2000
            });
          })
        }
    });
  }

  openUpdateOrgDialog(current_org: Organization): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "50%";

    dialogConfig.data = {
      name: current_org.name,
      startDate: current_org.startDate,
      endDate: current_org.endDate
    }

    const dialogRef = this.dialog.open(UpdateOrgDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
          // Update the organization
          current_org = {org_id:current_org.org_id,name:result.name,
                        startDate:this.datepipe.transform(result.startDate, 'MM/dd/yyyy'), 
                        endDate:this.datepipe.transform(result.endDate, 'MM/dd/yyyy')};
          console.log(current_org)
          this.orgService.updateOrganization(current_org).subscribe(data=>{
            console.log(data);

            // refresh organization list
            this.getOrgs();
            this._snackbar.open('Organization updated', null, {
              duration: 2000
            });
          })
        }
    });
  }

  deleteOrg(org: Organization): void{
    console.log(org)
    // this.orgService.deleteOrganization(org.org_id).subscribe(data =>{
    //   console.log(data);  

    //   // refresh organization list
    //   this.getOrgs();
    // })

    // open dialog to make sure of the deletion
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";

    const dialogRef = this.dialog.open(ConfirmDeletionComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
        // if(result){
          
        // }
    });
  }
}
