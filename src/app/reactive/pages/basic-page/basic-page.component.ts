import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {

  constructor(private fb: FormBuilder) {}

  public formGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]], 
    inStorage: [0, [Validators.required, Validators.min(1)]], 
  })

  /**
   * isValidField
   */
  public isValidField( field: string ): boolean {
    return !!this.formGroup.controls[ field ].errors && this.formGroup.controls[ field ].touched
  }

  /**
   * getFieldError
   */
  public getFieldError( field: string ): string | null {
    
    if ( !this.formGroup.controls[field] ) 
      throw Error(`The control "${ field }" doesn't not exist`)

    const errors = this.formGroup.controls[ field ].errors || {}

    for ( const key of Object.keys(errors) ) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
          break;

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`
          break;
      
        case 'min':
          return `El valor minimo es ${ errors['min'].min }`
          break;
      
        default:
          break;
      }
    }

    return null
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if ( !this.formGroup.valid ) {
      this.formGroup.markAllAsTouched()
      return
    }


    console.log( this.formGroup );
    
    
  }
}
