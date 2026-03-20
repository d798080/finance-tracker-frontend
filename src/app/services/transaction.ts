import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//HttpClient permet d'envoyer des requêtes HTTP vers le backend Spring Boot

import { Observable } from 'rxjs';
//Observable permet de gérer les réponses asynchrones (appel API)

import { Transaction, TransactionCreateInput } from '../data/transaction';
//Import du modèle Transaction et du type utilisé pour créer une transaction

import { environment } from '../environments/environment';
//Import du fichier environment contenant l'URL du backend

@Injectable({
  providedIn: 'root'
})
//Ce service est accessible partout dans l'application
//Angular crée une seule instance du service (singleton)

export class TransactionService {

  private apiUrl = `${environment.apiUrl}/transactions`;
  //URL de l'API backend pour les transactions
  //environment.apiUrl contient la base (ex: http://localhost:8080/v1)

  constructor(private http: HttpClient) {}
  //Injection du service HttpClient dans ce service

  getAll(): Observable<Transaction[]> {
  //Méthode permettant de récupérer toutes les transactions depuis le backend

    return this.http.get<Transaction[]>(this.apiUrl);
    //Envoie une requête HTTP GET vers :
    //http://localhost:8080/v1/transactions

    //Le backend renvoie une liste de transactions
    //Angular convertit automatiquement le JSON en Transaction[]
  }

  create(payload: TransactionCreateInput): Observable<Transaction> {
  //Méthode permettant de créer une nouvelle transaction

    return this.http.post<Transaction>(this.apiUrl, payload);
    //Envoie une requête HTTP POST au backend

    //payload contient les données du formulaire :
    //amount, type, date, description, category

    //Le backend crée la transaction dans la base de données
    //et renvoie la transaction créée
  }

  delete(id: string): Observable<void> {
  //Cette méthode supprime une transaction à partir de son id (: Observable<void> signifie qu'un observable est retourné)

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    //Envoie une requête HTTP DELETE vers : http://localhost:8080/v1/transactions/{id}
  }

  update(id: string, payload: TransactionCreateInput): Observable<Transaction> {
  //Met à jour une transaction existante à partir de son id

    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, payload);
    //Envoie une requête HTTP PUT vers :
    //http://localhost:8080/v1/transactions/{id}
  }

  getById(id: string): Observable<Transaction> {
    //Récupère une transaction à partir de son id
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }
}