//Le rôle de app-module est de dire à angular quels composants existent, quels modules sont utilisés, et quel composant démarre l'application
//Rappel : Un composant est une brique visuelle de l'application
//Un module est un conteneur qui regroupe des composants et des fonctionnalités

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { TopBar } from './components/top-bar/top-bar';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionListItem } from './components/transaction-list-item/transaction-list-item';
import { AddTransaction } from './components/add-transaction/add-transaction';
import { AddGoal } from './components/add-goal/add-goal';

@NgModule({
  //Déclaration des composants utilisés
  declarations: [
    App,
    TopBar,
    TransactionList,
    TransactionListItem,
    AddTransaction,
    AddGoal,
  ],

  //Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
  bootstrap: [App],//Angular démarre le composant App, c'est le point de départ
})
export class AppModule {}