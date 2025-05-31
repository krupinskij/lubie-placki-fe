import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Controller } from '@components/controller/controller.component';

import * as Validators from './new.validators';
import { RecipeService } from '@services/recipe.service';
import { Router } from '@angular/router';
import { ImageService } from '@services/image.service';

@Component({
  selector: 'page-new',
  imports: [ReactiveFormsModule, Controller],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewPage {
  formData = new FormData();

  private imageService = inject(ImageService);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);
  newRecipeForm = this.formBuilder.group({
    title: ['', [Validators.required(), Validators.maxStrLength(50)]],
    time: this.formBuilder.group({
      value: [0, [Validators.required(), Validators.min(1), Validators.max(99999)]],
      unit: ['', [Validators.required(), Validators.maxStrLength(10)]],
    }),
    image: ['', [Validators.required()]],
    imageId: [''],
    ingredientsGroups: this.formBuilder.array(
      [
        this.formBuilder.group({
          _id: [Math.random()],
          title: ['', [Validators.required(), Validators.maxStrLength(50)]],
          ingredients: this.formBuilder.array(
            [
              this.formBuilder.group({
                _id: [Math.random()],
                name: ['', [Validators.required(), Validators.maxStrLength(50)]],
                quantity: [0, [Validators.required(), Validators.min(1), Validators.max(99999)]],
                unit: ['', [Validators.required(), Validators.maxStrLength(10)]],
              }),
            ],
            { validators: [Validators.minArrayLength(1)] }
          ),
        }),
      ],
      { validators: [Validators.minArrayLength(1)] }
    ),
    methodsGroups: this.formBuilder.array(
      [
        this.formBuilder.group({
          _id: [Math.random()],
          title: ['', [Validators.required(), Validators.maxStrLength(50)]],
          methods: this.formBuilder.array(
            [
              this.formBuilder.group({
                _id: [Math.random()],
                text: ['', [Validators.required(), Validators.maxStrLength(500)]],
              }),
            ],
            { validators: [Validators.minArrayLength(1)] }
          ),
        }),
      ],
      { validators: [Validators.minArrayLength(1)] }
    ),
  });

  getTitle() {
    return this.newRecipeForm.get('title');
  }

  getTimeValue() {
    return this.newRecipeForm.get('time')?.get('value');
  }

  getTimeUnit() {
    return this.newRecipeForm.get('time')?.get('unit');
  }

  getImage() {
    return this.newRecipeForm.get('image');
  }

  getIngredientsGroups() {
    return this.newRecipeForm.get('ingredientsGroups') as FormArray;
  }

  getIngredientsGroupTitle(igIdx: number) {
    const ingredientsGroups = this.getIngredientsGroups().controls;
    const ingredientsGroup = ingredientsGroups[igIdx];

    return ingredientsGroup.get('title') as FormArray;
  }

  getIngredientsGroupsError() {
    const ingredientsGroups = this.getIngredientsGroups();
    return ingredientsGroups.errors?.['message'];
  }

  getIngredients(igIdx: number) {
    const ingredientsGroups = this.getIngredientsGroups().controls;
    return ingredientsGroups[igIdx].get('ingredients') as FormArray;
  }

  getIngredientsError(igIdx: number) {
    const ingredients = this.getIngredients(igIdx);
    return ingredients.errors?.['message'];
  }

  getIngredient(igIdx: number, iIdx: number) {
    const ingredients = this.getIngredients(igIdx).controls;
    return ingredients[iIdx];
  }

  getIngredientName(igIdx: number, iIdx: number) {
    const ingredient = this.getIngredient(igIdx, iIdx);
    return ingredient.get('name');
  }

  getIngredientQuantity(igIdx: number, iIdx: number) {
    const ingredient = this.getIngredient(igIdx, iIdx);
    return ingredient.get('quantity');
  }

  getIngredientUnit(igIdx: number, iIdx: number) {
    const ingredient = this.getIngredient(igIdx, iIdx);
    return ingredient.get('unit');
  }

  addIngredientsGroup() {
    const ingredientsGroups = this.getIngredientsGroups();
    ingredientsGroups.push(
      this.formBuilder.group({
        _id: [Math.random()],
        title: ['', [Validators.required(), Validators.maxStrLength(50)]],
        ingredients: this.formBuilder.array(
          [
            this.formBuilder.group({
              _id: [Math.random()],
              name: ['', [Validators.required(), Validators.maxStrLength(50)]],
              quantity: [0, [Validators.required(), Validators.min(1), Validators.max(99999)]],
              unit: ['', [Validators.required(), Validators.maxStrLength(10)]],
            }),
          ],
          { validators: [Validators.minArrayLength(1)] }
        ),
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
        _id: [Math.random()],
        name: ['', [Validators.required(), Validators.maxStrLength(50)]],
        quantity: [0, [Validators.required(), Validators.min(1), Validators.max(99999)]],
        unit: ['', [Validators.required(), Validators.maxStrLength(10)]],
      })
    );
  }

  removeIngredient(igIdx: number, iIdx: number) {
    const ingredients = this.getIngredients(igIdx);
    ingredients.removeAt(iIdx);
  }

  getMethodsGroups() {
    return this.newRecipeForm.get('methodsGroups') as FormArray;
  }

  getMethodsGroupTitle(igIdx: number) {
    const methodsGroups = this.getMethodsGroups().controls;
    const methodsGroup = methodsGroups[igIdx];

    return methodsGroup.get('title') as FormArray;
  }

  getMethodsGroupsError() {
    const methodGroups = this.getMethodsGroups();
    return methodGroups.errors?.['message'];
  }

  getMethods(mgIdx: number) {
    const methodsGroups = this.getMethodsGroups().controls;
    return methodsGroups[mgIdx].get('methods') as FormArray;
  }

  getMethodsError(igIdx: number) {
    const methods = this.getMethods(igIdx);
    return methods.errors?.['message'];
  }

  getMethod(mgIdx: number, mIdx: number) {
    const methods = this.getMethods(mgIdx).controls;
    return methods[mIdx];
  }

  getMethodText(mgIdx: number, mIdx: number) {
    const method = this.getMethod(mgIdx, mIdx);
    return method.get('text');
  }

  addMethodsGroup() {
    const methodsGroups = this.getMethodsGroups();
    methodsGroups.push(
      this.formBuilder.group({
        _id: [Math.random()],
        title: ['', [Validators.required(), Validators.maxStrLength(50)]],
        methods: this.formBuilder.array(
          [
            this.formBuilder.group({
              _id: [Math.random()],
              text: ['', [Validators.required(), Validators.maxStrLength(300)]],
            }),
          ],
          { validators: [Validators.minArrayLength(1)] }
        ),
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
        _id: [Math.random()],
        text: ['', [Validators.required(), Validators.maxStrLength(300)]],
      })
    );
  }

  removeMethod(mgIdx: number, mIdx: number) {
    const methods = this.getMethods(mgIdx);
    methods.removeAt(mIdx);
  }

  get isFormInvalid() {
    return this.newRecipeForm.invalid;
  }

  onFileSelected(event: Event) {
    const target: any = event.target;
    const file: File = target?.files[0];

    if (file) {
      this.formData.delete('image');
      this.formData.append('image', file);
    }
  }

  onSubmit() {
    if (this.isFormInvalid) {
      this.newRecipeForm.markAllAsTouched();
      return;
    }

    this.imageService.uploadImage(this.formData).subscribe(({ id }) => {
      this.newRecipeForm.get('imageId')?.setValue(id);

      this.recipeService.postRecipe(this.newRecipeForm.value).subscribe(({ id }) => {
        this.router.navigate([`/recipe/${id}`]);
      });
    });
  }
}
