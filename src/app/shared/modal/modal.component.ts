import {Component, ViewChild, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'modalcomponent',
    templateUrl: 'modal.template.html'
})
export class ModalComponent{
    @Input() formErrors: Array<any>;
    @Input() selectedRow: any = null;
    @Input() modalHeader: String = "";
    @Input() cancelButtonLabel: String = "";
    @Input() submitButtonLabel: String = "";
    @Input() rows: Array<any>;
    @Input() columns: Array<any>;
    @Input() data: any[];
    @Input() totalItems: number;
    @Input() config:any;
    @Output() onSubmitModal = new EventEmitter();
    @ViewChild('childModal') public childModal;

    constructor(){}

    public open(){
        //this.selectedRow = row;
        this.childModal.open();
    }
    public close(){
        this.childModal.close();
        this.formErrors = [];
        //this.selectedRow = null;
    }
    public modalOnClose(){
        this.childModal.close();
        this.formErrors = [];
       // this.selectedRow = null;
    }

    public modalOnSubmit() {
        this.onSubmitModal.emit(this.selectedRow);
    }
}
