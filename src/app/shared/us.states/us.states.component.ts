import { Component, OnInit, Input } from '@angular/core';
import { StatesService } from './states.service'

@Component({
    selector: 'states-select',
    templateUrl: 'us.states.template.html'
})
export class UsStatesComponent implements OnInit{
    @Input() state: boolean;
    private states: Array<any> = [];

    constructor(private statesService: StatesService) {}

    ngOnInit() {
        this.loadAllStates();
    }
    private loadAllStates(): void{
        this.statesService.getAll().subscribe(states => this.states = states);
    }
}
