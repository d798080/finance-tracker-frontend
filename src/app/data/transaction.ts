import { Category } from './category'; //Importation du type category

export type TransactionType = 'INCOME' | 'EXPENSE'; //Création d'un type qui n'accepte que deux valeurs possibles : soit INCOME soit EXPENSE

export interface Transaction {//Pour définir les champs que doit avoir une transaction
  id: string;
  amount: number;
  type: TransactionType;
  date: string;        // YYYY-MM-DD
  description: string;
  category: Category;
}

//Pour le formulaire (c'est l'équivalent de PostCreateInput du projet blog)
export interface TransactionCreateInput {//Structure des données envoyées au backend pour créer une nouvelle transaction
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  category: { id: string };
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    amount: 2500,
    type: 'INCOME',
    date: '2026-02-01',
    description: 'Salary',
    category: { id: 'c0', name: 'Income' },
  },
  {
    id: 't2',
    amount: 65.4,
    type: 'EXPENSE',
    date: '2026-02-03',
    description: 'Groceries',
    category: { id: 'c1', name: 'Food' },
  },
];