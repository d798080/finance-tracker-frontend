import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionList } from './components/transaction-list/transaction-list';
import { AddTransaction } from './components/add-transaction/add-transaction';
import { AddGoal } from './components/add-goal/add-goal';

const routes: Routes = [
  { path: '', component: TransactionList }, 
  //Si l'URL est "/", on affiche la liste des transactions

  { path: 'add-transaction', component: AddTransaction }, 
  //Si l'URL est "/add-transaction", on affiche le formulaire d'ajout

  { path: 'edit-transaction/:id', component: AddTransaction },
  //Si l'URL est "/edit-transaction/:id", on affiche le même formulaire
  //mais cette fois en mode édition
  //:id représente l'identifiant de la transaction à modifier

  { path: 'add-goal', component: AddGoal },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //Enregistre les routes dans Angular

  exports: [RouterModule]
  //Rend le Router disponible dans toute l'application
})
export class AppRoutingModule { }