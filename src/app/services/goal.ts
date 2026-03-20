import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//HttpClient permet d'envoyer des requêtes HTTP vers le backend

import { Observable } from 'rxjs';
//Observable permet de gérer les données asynchrones

import { Goal, GoalCreateInput } from '../data/goal';
//Import du modèle Goal et du type utilisé pour la création

import { environment } from '../environments/environment';
//Import du fichier environment contenant l'URL du backend

@Injectable({
  providedIn: 'root'
})
//Ce service est disponible partout dans l'application
//Angular crée une seule instance du service

export class GoalService {

  private apiUrl = `${environment.apiUrl}/goals`;
  //URL du backend pour les goals
  //environment.apiUrl contient la base (ex: http://localhost:8080/v1)

  constructor(private http: HttpClient) {}
  //Injection de HttpClient dans le service

  getAll(): Observable<Goal[]> {
    //Récupère tous les goals depuis le backend
    return this.http.get<Goal[]>(this.apiUrl);
  }

  getById(id: string): Observable<Goal> {
    //Récupère un goal à partir de son id
    return this.http.get<Goal>(`${this.apiUrl}/${id}`);
  }

  create(payload: GoalCreateInput): Observable<Goal> {
    //Crée un nouveau goal dans la base
    return this.http.post<Goal>(this.apiUrl, payload);
  }

  update(id: string, payload: GoalCreateInput): Observable<Goal> {
    //Met à jour un goal existant
    return this.http.put<Goal>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    //Supprime un goal à partir de son id
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}