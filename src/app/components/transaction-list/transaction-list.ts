import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../data/transaction';
import { TransactionService } from '../../services/transaction';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category';
import Chart from 'chart.js/auto';

import { Goal } from '../../data/goal';
import { GoalService } from '../../services/goal';

@Component({
  selector: 'app-transaction-list',
  standalone: false,
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {

  transactions: Transaction[] = [];
  //Liste complète des transactions récupérées depuis le backend

  filteredTransactions: Transaction[] = [];
  //Liste des transactions affichées après filtrage

  categories: Category[] = [];
  //Liste des catégories récupérées depuis le backend

  selectedCategoryId: string = '';
  //Id de la catégorie sélectionnée dans le filtre
  //Si vide, aucune catégorie n'est sélectionnée

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    //Au chargement du composant, on récupère les transactions
    //et les catégories ainsi que les goals

    this.loadTransactions();
    this.loadCategories();
    this.loadGoals();

  }

  loadTransactions(): void {
  //Récupère toutes les transactions depuis le backend

  this.transactionService.getAll().subscribe((transactions) => {
    this.transactions = transactions;
    //Stocke la liste complète

    this.applyFilter();
    //Met à jour la liste affichée

    this.calculateSummary();
    //Met à jour les totaux financiers


    this.calculateSummary();
    this.createChart();
    //Pour le graphique
  });
}

  loadCategories(): void {
    //Récupère toutes les catégories depuis le backend

    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  //Ancienne version de applyFilter qui ne filtre qu'en fonction des catégories
  /*applyFilter(): void {
    //Applique le filtre par catégorie

    if (!this.selectedCategoryId) {
      //Si aucune catégorie n'est sélectionnée,
      //on affiche toutes les transactions

      this.filteredTransactions = this.transactions;
      return;
    }

    this.filteredTransactions = this.transactions.filter(
      (transaction) => transaction.category.id === this.selectedCategoryId
    );
    //On garde seulement les transactions de la catégorie choisie
  }*/

  onCategoryChange(event: Event): void {
    //Méthode appelée quand l'utilisateur change la catégorie dans la liste déroulante

    const target = event.target as HTMLSelectElement;
    this.selectedCategoryId = target.value;

    this.applyFilter();
  }

  deleteTransaction(id: string): void {
    //Demande confirmation avant suppression

    const confirmed = confirm('Are you sure you want to delete this transaction?');

    if (!confirmed) {
      return;
    }

    this.transactionService.delete(id).subscribe(() => {
      this.loadTransactions();
      //Recharge les transactions après suppression
    });
  }

  //Pour le dashboard----------------------------

  totalIncome: number = 0;
//Total des transactions de type INCOME

totalExpense: number = 0;
//Total des transactions de type EXPENSE

balance: number = 0;
//Solde = revenus - dépenses

calculateSummary(): void {
  //Calcule les totaux financiers à partir de la liste complète des transactions

  this.totalIncome = this.transactions
    .filter((transaction) => transaction.type === 'INCOME')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  //Additionne tous les montants des transactions de type INCOME

  this.totalExpense = this.transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  //Additionne tous les montants des transactions de type EXPENSE

  this.balance = this.totalIncome - this.totalExpense;
  //Calcule le solde final
}

//+Modification de loadTransactions qui met désormais à jour les totaux via la fonction calculateSummary tout juste créée



//Partie graphique----------------------------------------

chart: any;
//Contiendra l'objet Chart.js

createChart(): void {
  //Calcule les dépenses par catégorie

  const expenseTransactions = this.transactions.filter(
    (transaction) => transaction.type === 'EXPENSE'
  );
  //On garde uniquement les transactions de type EXPENSE

  const categoryTotals: { [key: string]: number } = {};
  //Objet qui va stocker le total des dépenses par catégorie

  expenseTransactions.forEach((transaction) => {
    const categoryName = transaction.category.name;

    if (!categoryTotals[categoryName]) {
      categoryTotals[categoryName] = 0;
    }

    categoryTotals[categoryName] += Number(transaction.amount);
  });

  const labels = Object.keys(categoryTotals);
  //Liste des catégories

  const values = Object.values(categoryTotals);
  //Montants correspondants

  this.chart = new Chart('expenseChart', {
    type: 'pie',
    //Type de graphique (camembert)

    data: {
      labels: labels,
      datasets: [
        {
          label: 'Expenses by Category',
          data: values,
        },
      ],
    },
  });
}

//--------Filtrage en fonction du type



selectedType: string = '';
//Type sélectionné dans le filtre
//Si vide, aucun filtre par type n'est appliqué

//à refaire dans le backend
applyFilter(): void {
  //Applique tous les filtres sur les transactions

  this.filteredTransactions = this.transactions.filter((transaction) => {

    //Filtre par catégorie
    const matchesCategory =
      !this.selectedCategoryId || transaction.category.id === this.selectedCategoryId;

    //Filtre par type
    const matchesType = !this.selectedType || transaction.type === this.selectedType;

    //Filtre par date de début
    const matchesStartDate = !this.startDate || transaction.date >= this.startDate;

    //Filtre par date de fin
    const matchesEndDate = !this.endDate || transaction.date <= this.endDate;

    return (
      matchesCategory && matchesType && matchesStartDate && matchesEndDate
    );
  });
}

onTypeChange(event: Event): void {
  //Méthode appelée quand l'utilisateur change le type dans la liste déroulante

  const target = event.target as HTMLSelectElement;
  this.selectedType = target.value;
  //Met à jour le type sélectionné

  this.applyFilter();
  //Réapplique les filtres
}

//Filtrage par date----------------

startDate: string = '';
//Date de début sélectionnée dans le filtre

endDate: string = '';
//Date de fin sélectionnée dans le filtre

//Modification de applyFilter

onStartDateChange(event: Event): void {
  //Méthode appelée lorsque l'utilisateur modifie la date de début dans le champ input

  const target = event.target as HTMLInputElement;
  //event.target correspond à l'élément HTML qui a déclenché l'événement
  //On le convertit en HTMLInputElement pour pouvoir accéder à la propriété "value"

  this.startDate = target.value;
  //On récupère la valeur saisie dans l'input
  //Cette valeur correspond à la date de début du filtre

  this.applyFilter();
  //On applique à nouveau les filtres pour mettre à jour la liste des transactions
}


onEndDateChange(event: Event): void {
  //Méthode appelée lorsque l'utilisateur modifie la date de fin dans le champ input

  const target = event.target as HTMLInputElement;
  //Récupération de l'élément input qui a déclenché l'événement

  this.endDate = target.value;
  //On enregistre la date de fin sélectionnée par l'utilisateur

  this.applyFilter();
  //On réapplique tous les filtres (catégorie, type et date)
  //pour mettre à jour les transactions affichées
}

//Implémentation des objectifs--------------

goals: Goal[] = [];
//Liste des objectifs d'épargne récupérés depuis le backend

//Ajout de goalService: GoalService dans le constructeur (constructor)
//Ajout également du chargement des goals dans le ngOninit (loadGoals())

loadGoals(): void {
  //Récupère tous les goals depuis le backend

  this.goalService.getAll().subscribe((goals) => {
    this.goals = goals;
    //Stocke la liste des objectifs d'épargne
  });
}

//Méthode pour calculer le progrès

getGoalProgress(goal: Goal): number {
  //Calcule le pourcentage de progression d'un goal

  if (goal.targetAmount <= 0) {
    //Évite une division par zéro ou une valeur incohérente
    return 0;
  }

  const progress = (this.balance / goal.targetAmount) * 100;
  //Calcule le pourcentage atteint à partir du solde actuel

  return Math.min(progress, 100);
  //Empêche le pourcentage de dépasser 100%
}
}