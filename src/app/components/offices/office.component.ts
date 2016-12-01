import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {OfficeService} from "./office.service";
import {StatesService} from "../../shared/services/states.service";
import {Office} from "./office";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'office',
    templateUrl: 'office.template.html'
})
export class OfficeComponent implements OnInit{
    private office: Office = new Office();
    private states: Array<any> = [];
    private officeTypes: Array<any> = [
        {value: 'safeBuilt', label: 'SAFEbuilt'},
        {value: 'meritage', label: 'Meritage'}
    ];
    constructor(private statesService: StatesService,
                private officeService: OfficeService,
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
                    /*Mock data*/
                    this.office = {
                        "id": 1,
                        "name": "Office 1",
                        "state": "AZ",
                        "type": "meritage",
                        "jurisdictions": 5,
                        "creationDate": "3/25/2010"
                    }
                });
        }
        this.loadAllStates();
    }
    private onSubmit() {

    }
    private loadAllStates(){
        this.statesService.getAll().subscribe(states => this.states = states);
    }
    private onCancel(){
        this.router.navigate(['/offices']);
    }
    private addAdminToOffice(){
        console.log('add admin to office');
    }

}