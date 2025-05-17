import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { GroupComponent } from '../../components/group/group.component';

@Component({
  selector: 'page-new',
  imports: [ReactiveFormsModule, InputComponent, GroupComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewPage {
  private formBuilder = inject(FormBuilder);
  newRecipeForm = this.formBuilder.group({
    title: [''],
    time: this.formBuilder.group({
      value: [0],
      unit: [''],
    }),
    image: [''],
    ingredientsGroups: this.formBuilder.array([
      this.formBuilder.group({
        id: [Math.random()],
        title: [''],
        ingredients: this.formBuilder.array([
          this.formBuilder.group({
            id: [Math.random()],
            name: [''],
            quantity: [0],
            unit: [''],
          }),
        ]),
      }),
    ]),
    methodsGroups: this.formBuilder.array([
      this.formBuilder.group({
        id: [Math.random()],
        title: [''],
        methods: this.formBuilder.array([
          this.formBuilder.group({
            id: [Math.random()],
            text: [''],
          }),
        ]),
      }),
    ]),
  });

  getIngredientsGroups() {
    const formArray = this.newRecipeForm.get('ingredientsGroups') as FormArray;
    return formArray;
  }

  getIngredients(igIdx: number) {
    const ingredientsGroups = this.getIngredientsGroups().controls;
    const formArray = ingredientsGroups[igIdx].get('ingredients') as FormArray;
    return formArray;
  }

  addIngredientsGroup() {
    const ingredientsGroups = this.getIngredientsGroups();
    ingredientsGroups.push(
      this.formBuilder.group({
        id: [Math.random()],
        title: [''],
        ingredients: this.formBuilder.array([
          this.formBuilder.group({
            id: [Math.random()],
            name: [''],
            quantity: [0],
            unit: [''],
          }),
        ]),
      })
    );
  }

  removeIngredientsGroup(igIdx: number) {
    const ingredientsGroups = this.getIngredientsGroups();
    ingredientsGroups.removeAt(igIdx);
  }

  addIngredient(mgIdx: number) {
    const ingredients = this.getIngredients(mgIdx);
    ingredients.push(
      this.formBuilder.group({
        id: [Math.random()],
        name: [''],
        quantity: [0],
        unit: [''],
      })
    );
  }

  removeIngredient(igIdx: number, iIdx: number) {
    const ingredients = this.getIngredients(igIdx);
    ingredients.removeAt(iIdx);
  }

  getMethodsGroups() {
    const formArray = this.newRecipeForm.get('methodsGroups') as FormArray;
    return formArray;
  }

  getMethods(mgIdx: number) {
    const methodsGroups = this.getMethodsGroups().controls;
    const formArray = methodsGroups[mgIdx].get('methods') as FormArray;
    return formArray;
  }

  addMethodsGroup() {
    const methodsGroups = this.getMethodsGroups();
    methodsGroups.push(
      this.formBuilder.group({
        id: [Math.random()],
        title: [''],
        methods: this.formBuilder.array([
          this.formBuilder.group({
            id: [Math.random()],
            text: [''],
          }),
        ]),
      })
    );
  }

  removeMethodsGroup(mgIdx: number) {
    const methodsGroup = this.getMethodsGroups();
    methodsGroup.removeAt(mgIdx);
  }

  addMethod(mgIdx: number) {
    const methods = this.getMethods(mgIdx);
    methods.push(
      this.formBuilder.group({
        id: [Math.random()],
        text: [''],
      })
    );
  }

  removeMethod(mgIdx: number, mIdx: number) {
    const methods = this.getMethods(mgIdx);
    methods.removeAt(mIdx);
  }

  onSubmit() {
    console.warn(this.newRecipeForm.value);
  }
}
