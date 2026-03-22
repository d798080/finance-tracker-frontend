import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../../data/category';
import { CategoryService } from '../../services/category';
//Service qui permet de récupérer les catégories

import Swal from 'sweetalert2';

import { TransactionService } from '../../services/transaction';
//Service qui permet de gérer les transactions

@Component({
  selector: 'app-add-transaction',
  //Nom de la balise HTML utilisée pour afficher ce composant

  standalone: false,

  templateUrl: './add-transaction.html',
  //Fichier HTML associé au composant

  styleUrl: './add-transaction.css',
})
export class AddTransaction implements OnInit {

  categories: Category[] = [];
  //Tableau qui contiendra les catégories récupérées depuis le service

  transactionId: string | null = null;
  //Contiendra l'id de la transaction si on est en mode édition
  //Si null, cela signifie qu'on est en mode création

  isEditMode = false;
  //Indique si le composant est utilisé pour modifier une transaction existante

  //Déclaration des contrôles du formulaire
  descriptionControl: any;
  amountControl: any;
  typeControl: any;
  dateControl: any;
  categoryControl: any;

  constructor(
    private formBuilder: FormBuilder,
    //Service Angular pour créer des champs de formulaire

    private categoryService: CategoryService,
    //Service pour récupérer les catégories

    private transactionService: TransactionService,
    //Service pour gérer les transactions

    private router: Router,
    //Service permettant de naviguer entre les pages

    private route: ActivatedRoute
    //Service permettant de lire les paramètres de l'URL
  ) {
    this.descriptionControl = this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(150)
    ]);
    //Champ description : obligatoire, max 150 caractères

    this.amountControl = this.formBuilder.control('', [
      Validators.required,
      Validators.min(0.01)
    ]);
    //Champ montant : obligatoire, minimum 0.01

    this.typeControl = this.formBuilder.control('EXPENSE', [
      Validators.required
    ]);
    //Champ type : obligatoire, valeur par défaut = EXPENSE

    this.dateControl = this.formBuilder.control('', [
      Validators.required
    ]);
    //Champ date : obligatoire

    this.categoryControl = this.formBuilder.control('', [
      Validators.required
    ]);
    //Champ catégorie : obligatoire
  }

  ngOnInit(): void {
    //On lit l'id dans l'URL
    this.transactionId = this.route.snapshot.paramMap.get('id');
    //Si l'URL est /edit-transaction/:id, on récupère l'id
    //Si l'URL est /add-transaction, on obtient null

    this.isEditMode = !!this.transactionId;
    //Convertit transactionId en booléen
    //true si un id existe, false sinon

    //On charge d'abord les catégories
    this.categoryService.getAll().subscribe((categ) => {
      this.categories = categ;
      //Stockage des catégories dans le tableau

      if (categ.length && !this.isEditMode) {
        this.categoryControl.setValue(categ[0].id);
      }
      //En mode création, on sélectionne automatiquement la première catégorie

      if (this.isEditMode && this.transactionId) {
        //Si on est en mode édition, on charge la transaction existante

        this.transactionService.getById(this.transactionId).subscribe((transaction) => {
          //On remplit le formulaire avec les données de la transaction

          this.descriptionControl.setValue(transaction.description);
          this.amountControl.setValue(transaction.amount);
          this.typeControl.setValue(transaction.type);
          this.dateControl.setValue(transaction.date);
          this.categoryControl.setValue(transaction.category.id);
        });
      }
    });
  }

  goBack(): void {
    //Retour à la page d'accueil
    this.router.navigateByUrl('/');
  }

  onSubmit(): void {
  //On marque chaque champ comme touché
  this.descriptionControl.markAsTouched();
  this.amountControl.markAsTouched();
  this.typeControl.markAsTouched();
  this.dateControl.markAsTouched();
  this.categoryControl.markAsTouched();

  if (
    this.descriptionControl.invalid ||
    this.amountControl.invalid ||
    this.typeControl.invalid ||
    this.dateControl.invalid ||
    this.categoryControl.invalid
  ) {
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
    description: this.descriptionControl.value!,
    amount: Number(this.amountControl.value!),
    type: this.typeControl.value!,
    date: this.dateControl.value!,
    category: {
      id: this.categoryControl.value!
    },
  };
  //Objet envoyé au backend

  if (this.isEditMode && this.transactionId) {
    //Si on est en mode édition, on met à jour la transaction existante

    this.transactionService.update(this.transactionId, payload).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Transaction updated successfully',
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
          title: 'An error occurred while updating the transaction',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });

  } else {
    //Sinon, on crée une nouvelle transaction

    this.transactionService.create(payload).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Transaction created successfully',
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
          title: 'An error occurred while creating the transaction',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }
}
}