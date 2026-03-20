export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
}
//Interface représentant un objectif d'épargne côté frontend

export interface GoalCreateInput {
  name: string;
  targetAmount: number;
}
//Structure des données envoyées au backend pour créer ou modifier un goal

export const GOALS: Goal[] = [
  {
    id: 'g1',
    name: 'Vacation',
    targetAmount: 1000,
  },
  {
    id: 'g2',
    name: 'Emergency Fund',
    targetAmount: 3000,
  },
];
//Données mockées temporaires
//Elles pourront servir si besoin, mais avec le backend connecté
//elles ne seront normalement plus utilisées