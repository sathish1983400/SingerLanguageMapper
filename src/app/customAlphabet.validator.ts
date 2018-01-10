import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


// validation function
function validateCustomAlphabet() : ValidatorFn {
  return (c: AbstractControl) => {


    var re = /^[A-Za-z]+$/;
     let isValid =  re.test(c.value);

    if(isValid ) {
      return null;
    } else {
      return {
        customAlphabet: {
          valid: false
        }
      };
    }

  }
}


@Directive({
  selector: '[customAlphabet][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CustomAlphabetValidator, multi: true }
  ]
})
export class CustomAlphabetValidator implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = validateCustomAlphabet();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
