import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JurisdictionsComponent} from "../jurisdictions/jurisdictions.component";
import { FormSidebarModule } from "../../shared/form.sidebar/form.sidebar.module";
import { JurisdictionService } from "../jurisdictions/jurisdiction.service";

@NgModule({
    imports: [CommonModule, FormSidebarModule],
    declarations: [
        JurisdictionsComponent
    ],
    providers: [JurisdictionService],
    exports: [JurisdictionsComponent]
})
export class JurisdictionsModule {}