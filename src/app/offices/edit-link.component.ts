import {Component, OnInit} from "@angular/core";


@Component({
    selector: 'editLink',
    template: `<a (click)="onEdit()" )></a>`
})
export class EditLinkComponent{
    /*private office: Office = new Office();
    private states: Array<any> = [];
    private officeTypes: Array<any> = [
        {value: 'safeBuilt', label: 'SAFEbuilt'},
        {value: 'meritage', label: 'Meritage'}
    ];
    constructor(private statesService: StatesService){

    }
    ngOnInit() {
        this.loadAllStates();
    }
    private onSubmit() {

    }
    private loadAllStates(){
        this.statesService.getAll().subscribe(states => this.states = states);
    }*/
    onEdit(){
        alert('EDIT')
    }
}