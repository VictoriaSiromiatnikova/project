import {
    Component, Input, Output, OnChanges, EventEmitter, DoCheck, SimpleChange, KeyValueDiffer,
    IterableDiffer, KeyValueDiffers, IterableDiffers
} from '@angular/core';

@Component({
    selector: 'custom-table',
    templateUrl: 'custom.table.template.html'
})
export class CustomTableComponent implements DoCheck{
    private differ;

    @Input() columns: Array<any>;
    @Input() data: any[];
    @Input() totalItems: number;
    @Input() config:any;
    @Output() onDelete = new EventEmitter();
    @Output() onEdit = new EventEmitter();
    @Output() onNameClick = new EventEmitter();
    @Output() onRowClicked = new EventEmitter();

    constructor(private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
    }

    public page:number = 1;
    public rows: Array<any> = [];
    public itemsPerPage:number = 10;
    public startItemOnPageIndex:number = 1;
    public endItemOnPageIndex: number = 1;
    public itemsPerPageList: Array<any> = [5, 10, 50];

    ngDoCheck (){
        let changes = this.differ.diff(this.data);

        if (changes) {
           Object.assign(this.rows, this.data);
            this.extendRowsWithActions();
        }
    }
    /*
    * Methods to extend table functionality with actions column
    * */
    private extendColumsWithActions(){
        this.columns = this.columns.concat([
            { title: '', name: 'delete', sort: false, class:'actions', filtering: false},
            { title: '', name: 'edit', sort: false, class:'actions', filtering: false }
        ]);
        this.onChangeTable();
    }
    private extendRowsWithActions(){
        if(this.config.actions){
            for(let row of this.rows){
                row['delete'] = `<div name: "delete" class="delete">Delete</div>`;
                row['edit'] = `<div class="edit" name="edit">Edit</div>`;
            }
            for(let row of this.data){
                row['delete'] = `<div name: "delete" class="delete">Delete</div>`;
                row['edit'] = `<div class="edit" name="edit">Edit</div>`;
            }
            this.extendColumsWithActions();
        }
    }

    public onCellClicked(event){
        if(event.column === 'delete'){
            this.onDelete.emit(event.row);
        }
        if(event.column === 'edit'){
            this.onEdit.emit(event.row);
        }
        if(event.column === 'name'){
            this.onNameClick.emit(event.row);
        }
        this.onRowClicked.emit(event);
    }

    public pageChanged(event:any):void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }
    public changePage(page:any, data:Array<any> = this.data):Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        this.startItemOnPageIndex = start + 1;
        this.endItemOnPageIndex = end > data.length ? data.length : end;
        return data.slice(start, end);
    }

    public onChangeItemsPerPage(itemsPerPage: number){
        if(this.itemsPerPage !== itemsPerPage){
            this.itemsPerPage = itemsPerPage;
            this.onChangeTable();
        }
    }

    public changeSort(data:any, config:any):any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous:any, current:any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data:any, config:any):any {
        let filteredData:Array<any> = data;
        this.columns.forEach((column:any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item:any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item:any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray:Array<any> = [];
        filteredData.forEach((item:any) => {
            let flag = false;
            this.columns.forEach((column:any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }

    public onChangeTable(config:any = this.config, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.totalItems = sortedData.length;
    }

    public deleteClick(event){
        this.onDelete.emit(event.row);
    }
}
