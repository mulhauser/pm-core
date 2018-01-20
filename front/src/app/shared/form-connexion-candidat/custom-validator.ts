import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   *
   * @param control
   *
   * @returns {{email: boolean}}
   */
  static emailAddr(control: FormControl) {
    // email regex
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // returns control
    return regex.test(control.value) ? null : {
      emailAddr: true
    };
  }
}
