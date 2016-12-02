import { Component, OnInit } from "@angular/core";
import { OfficeService} from "./office.service";
import { Office } from "./office";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'office',
    templateUrl: 'office.template.html'
})
export class OfficeComponent implements OnInit{
    private office: Office = new Office();
    private states: Array<any> = [];

    constructor(private officeService: OfficeService,
                private route: ActivatedRoute,
                private router: Router){

    }
    ngOnInit() {
        let officeId = this.route.snapshot.params['id'];

        if(officeId){
            this.officeService.getById(officeId).subscribe(
                (office: Office) => {
                    this.office = office;
                },
                error => {
                    console.log(error.message);
                });
        }
    }

    /*
     * Event handler to save Office changes
     * */
    private onSubmit(): void {

    }

    /*
     * Event handler to cancel Office changes
     * */
    private onCancel(): void{
        this.router.navigate(['/offices']);
    }

    /*
    * Event handler for Admin Office Modal window submit
    * Add admin to office
    * */
    private addAdminToOffice(): void{
        console.log('add admin to office');
    }

}