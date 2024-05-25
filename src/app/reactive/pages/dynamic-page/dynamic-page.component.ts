import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder)

  public formGroup: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Pokemon Platinum', [ Validators.required, Validators.minLength(3) ]],
      ['COD Mobile', [ Validators.required, Validators.minLength(3) ]],
    ])
  })

  public newFavorite: FormControl = this.fb.control( '', Validators.required )
  
  public get favoriteGames()  {
    return this.formGroup.controls['favoriteGames'] as FormArray
  }

  /**
   * isValidField
   */
  public isValidField( field: string ): boolean {
    return !!this.formGroup.controls[ field ].errors && this.formGroup.controls[ field ].touched
  }
  
  public isValidFieldInArray( formArray: FormArray, index: number ): boolean {
    return !!formArray.controls[ index ].errors && formArray.controls[ index ].touched
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
   * getFieldError
   */
  public getFieldErrorInArray( formArray: FormArray, index: number ): string | null {
    
    if ( !formArray.controls[index] ) 
      throw Error(`The control "${ index }" in the FormArray doesn't not exist`)

    const errors = formArray.controls[ index ].errors || {}

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
   * addFavorite
   */
  public addFavorite() {
    if ( this.newFavorite.invalid ) return

    const newValue = this.newFavorite.value
    console.log(newValue);
    

    this.favoriteGames.controls.push(
      this.fb.control( newValue, [Validators.required, Validators.minLength(3)] )
    )

    this.newFavorite.reset()
    
  }

  /**
   * deleteFavorite
   */
  public deleteFavorite( index: number ) {
    this.favoriteGames.removeAt( index )
  }

  onSubmit() {
    if ( this.formGroup.invalid ) {
      this.formGroup.markAllAsTouched()
      return
    }

    this.formGroup.reset()

    this.favoriteGames.controls = []
  }
  

}
