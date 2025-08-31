import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPassowrdValidator]',
  standalone: false
})
export class PassowrdValidatorDirective implements Validator{

    @Input('appPasswordValidator') reglas: any = {};

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.reglas) return null;

    const password: string = control.value;
    const errors: any = {};

    if (this.reglas.passwordLargo && password.length < this.reglas.passwordLargo) {
      errors.minLength = `Debe tener al menos ${this.reglas.passwordLargo} caracteres`;
    }

    if (this.reglas.passwordCantidadMayusculas) {
      const mayus = (password.match(/[A-Z]/g) || []).length;
      if (mayus < this.reglas.passwordCantidadMayusculas) {
        errors.upperCase = `Debe tener al menos ${this.reglas.passwordCantidadMayusculas} mayúscula(s)`;
      }
    }

    if (this.reglas.passwordCantidadMinusculas) {
      const minus = (password.match(/[a-z]/g) || []).length;
      if (minus < this.reglas.passwordCantidadMinusculas) {
        errors.lowerCase = `Debe tener al menos ${this.reglas.passwordCantidadMinusculas} minúscula(s)`;
      }
    }

    if (this.reglas.passwordCantidadNumeros) {
      const nums = (password.match(/[0-9]/g) || []).length;
      if (nums < this.reglas.passwordCantidadNumeros) {
        errors.numbers = `Debe tener al menos ${this.reglas.passwordCantidadNumeros} número(s)`;
      }
    }

    if (this.reglas.passwordCantidadCaracteresEspeciales) {
      const specials = (password.match(/[^A-Za-z0-9]/g) || []).length;
      if (specials < this.reglas.passwordCantidadCaracteresEspeciales) {
        errors.specials = `Debe tener al menos ${this.reglas.passwordCantidadCaracteresEspeciales} caracter(es) especial(es)`;
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

}
