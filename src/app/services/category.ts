import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//HttpClient permet d'envoyer des requêtes HTTP vers le backend

import { Observable } from 'rxjs';
//Observable permet de gérer les données asynchrones (ex: réponse d'une API)

import { Category } from '../data/category';
//Import du modèle Category

import { environment } from '../environments/environment';
//Import du fichier environment contenant l'URL du backend

@Injectable({
  providedIn: 'root'
})
//providedIn: 'root' signifie que ce service est disponible partout dans l'application
//Angular crée une seule instance du service (singleton)

export class CategoryService {

  private apiUrl = `${environment.apiUrl}/categories`;
  //URL du endpoint backend pour les catégories
  //environment.apiUrl contient la base (ex: http://localhost:8080/v1)

  constructor(private http: HttpClient) {}
  //Injection de HttpClient dans le service
  //Angular fournit automatiquement l'objet http

  getAll(): Observable<Category[]> {
  //Cette méthode récupère toutes les catégories depuis le backend
  //Elle retourne un Observable contenant un tableau de Category

    return this.http.get<Category[]>(this.apiUrl);
    //Envoie une requête HTTP GET vers :
    //http://localhost:8080/v1/categories

    //Le backend Spring Boot renvoie une liste de catégories
    //HttpClient convertit automatiquement la réponse JSON en Category[]
  }
}