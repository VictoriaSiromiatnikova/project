import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormSidebarComponent } from "./form.sidebar.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        FormSidebarComponent
    ],
    providers: [],
    exports: [FormSidebarComponent]
})
export class FormSidebarModule {}