import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GoalService } from '../../services/goal';

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
      alert('Please review the form');
      return;
    }

    const payload = {
      name: this.nameControl.value!,
      targetAmount: Number(this.targetAmountControl.value!)
    };
    //Objet envoyé au backend

    this.goalService.create(payload).subscribe(() => {
      alert('Goal created');
      this.router.navigateByUrl('/');
    });
    //Crée le goal puis revient à l'accueil
  }
}