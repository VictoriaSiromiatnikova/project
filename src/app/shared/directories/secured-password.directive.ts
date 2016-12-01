import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function securedPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const regExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,24}$/;
        const name = control.value;
        const valid = regExp.test(name);
        return valid ? null : {'securedPassword': true};
    };
}

@Directive({
    selector: '[securedPassword]',
    providers: [{provide: NG_VALIDATORS, useExisting: SecuredPasswordDirective, multi: true}]
})
export class SecuredPasswordDirective implements Validator, OnChanges {
    @Input() securedPassword: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['securedPassword'];
        if (change) {
            this.valFn = securedPasswordValidator();
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }
}