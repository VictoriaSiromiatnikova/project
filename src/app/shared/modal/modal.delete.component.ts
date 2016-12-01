import {Component, ViewChild, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'modalDelete',
    templateUrl: 'modal.delete.template.html'
})
export class ModalDeleteComponent{
    @Input() formErrors: Array<any>;
    @Input() selectedRow: any = null;
    @Output() onDelete = new EventEmitter();
    @ViewChild('childModal') public childModal;

    constructor(){}

    public open(row: any){
        this.selectedRow = row;
        this.childModal.open();
    }
    public close(row: any){
        this.childModal.close();
        this.formErrors = [];
        this.selectedRow = null;
    }
    public modalOnClose(){
        this.childModal.close();
        this.formErrors = [];
        this.selectedRow = null;
    }

    public modalOnSubmit() {
        this.onDelete.emit(this.selectedRow);
    }
}
