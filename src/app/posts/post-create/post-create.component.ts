//*************************************************************************************** */
//Ce code représente un composant Angular appelé PostCreateComponent. 
//*************************************************************************************** */

//Importe les éléments nécessaires d'Angular : 
//Component pour définir un composant, 
//NgForm pour gérer les formulaires dans le modèle réactif, 
//et PostsService pour interagir avec le service des publications.
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../posts.service';

//Définit le composant avec le sélecteur 'app-post-create'.
//Utilise un fichier HTML (post-create.component.html) comme modèle et un fichier CSS (post-create.component.css) pour les styles.
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  //Déclare deux propriétés (enteredTitle et enteredContent) 
  //pour stocker les valeurs du titre et du contenu des publications.
  enteredTitle = "";
  enteredContent = "";

  //Déclare un constructeur qui injecte le service PostsService dans le composant.
  constructor(public postsService: PostsService) {}

  //Définit une méthode onAddPost appelée lorsqu'un utilisateur souhaite ajouter une nouvelle publication.
//Prend en paramètre un objet NgForm, qui représente le formulaire du modèle réactif.
//Vérifie si le formulaire est invalide, et si c'est le cas, arrête l'exécution de la méthode.
//Récupère les valeurs du titre et du contenu à partir du formulaire.
//Appelle la méthode addPost du service PostsService pour ajouter une nouvelle publication.
//Réinitialise le formulaire après l'ajout de la publication.
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.title);
    
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
