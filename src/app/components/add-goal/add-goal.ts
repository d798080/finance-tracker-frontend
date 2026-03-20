import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GoalService } from '../../services/goal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-goal',
  standalone: false,
  templateUrl: './add-goal.html',
  styleUrl: './add-goal.css',
})
export class AddGoal {

  nameControl: any;
  //Champ du formulaire pour le nom du goal

  targetAmountControl: any;
  //Champ du formulaire pour le montant cible

  constructor(
    private formBuilder: FormBuilder,
    //Service Angular permettant de créer les champs du formulaire

    private goalService: GoalService,
    //Service permettant de communiquer avec le backend pour les goals

    private router: Router
    //Service permettant de naviguer entre les pages
  ) {
    this.nameControl = this.formBuilder.control('', [Validators.required, Validators.maxLength(150)]);
    //Champ nom : obligatoire, maximum 150 caractères

    this.targetAmountControl = this.formBuilder.control('', [
      Validators.required,
      Validators.min(0.01)
    ]);
    //Champ montant cible : obligatoire, minimum 0.01
  }

  goBack(): void {
    //Retourne à la page d'accueil
    this.router.navigateByUrl('/');
  }

  onSubmit(): void {
  //Marque les champs comme touchés pour afficher les erreurs
  this.nameControl.markAsTouched();
  this.targetAmountControl.markAsTouched();

  if (this.nameControl.invalid || this.targetAmountControl.invalid) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Please review the form',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    return;
  }

  const payload = {
    name: this.nameControl.value!,
    targetAmount: Number(this.targetAmountControl.value!)
  };
  //Objet envoyé au backend

  this.goalService.create(payload).subscribe({
    next: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Goal created successfully',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

      this.router.navigateByUrl('/');
    },
    error: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred while creating the goal',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    }
  });
}
}