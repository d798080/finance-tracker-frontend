import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from '../../data/transaction';

@Component({
  selector: 'app-transaction-list-item',
  standalone: false,
  templateUrl: './transaction-list-item.html',
  styleUrl: './transaction-list-item.css',
})
export class TransactionListItem {
  @Input() transaction!: Transaction;
  //Transaction reçue depuis le composant parent
  //Le ! indique que cette valeur sera bien fournie par le parent

  @Output() deleted = new EventEmitter<void>();
  //Événement envoyé au parent quand l'utilisateur veut supprimer la transaction

  constructor(private router: Router) {}
  //Injection du Router pour pouvoir naviguer vers la page d'édition

  deleteTransaction(): void {
    //Méthode appelée quand l'utilisateur clique sur Delete
    //Elle envoie un événement au composant parent

    this.deleted.emit();
  }

  editTransaction(): void {
    //Méthode appelée quand l'utilisateur clique sur Edit
    //Elle redirige vers la page d'édition avec l'id de la transaction

    this.router.navigateByUrl(`/edit-transaction/${this.transaction.id}`);
  }

  
}