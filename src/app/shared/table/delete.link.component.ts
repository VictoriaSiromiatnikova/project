import { Component } from '@angular/core';

@Component({
    selector: 'table-delete',
    template: `<div (click)="deleteClick($event)" name="delete" class="delete">Delete</div>`
})
export class DeleteLinkTableComponent {
    constructor() {}

    private deleteClick() {
        console.log('delete');
    }
}
