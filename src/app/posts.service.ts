//Ceci est un service Angular appelé PostsService qui gère la communication avec 
//un serveur pour effectuer des opérations CRUD (Create, Read, Update, Delete) 
//sur une collection de publications.
import { HttpClient } from '@angular/common/http';//HttpClient est le module Angular permettant de faire des requêtes HTTP
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Post } from './posts/post.model';

//Subject fait partie de RxJS et est utilisé pour créer et observer des événements.
//map est un opérateur RxJS, bien qu'il semble être importé mais pas utilisé dans cet extrait de code.
//Post est un modèle pour les données de publication.
@Injectable({ //Le décorateur Injectable est utilisé pour indiquer que cette classe peut être injectée dans d'autres composants.
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  //postsUpdated est un Subject qui émet des événements lorsque les publications sont mises à jour.
  private postsUpdated = new Subject<Post[]>();
//L'instance de HttpClient est injectée dans le constructeur, la rendant disponible pour une utilisation dans le service.
  constructor(private http: HttpClient) {}
//Envoie une requête HTTP GET à l'URL spécifié pour récupérer des publications.
//S'abonne à l'observable renvoyé par la requête HTTP.
//Met à jour le tableau posts et émet un événement de mise à jour via postsUpdated.
  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        console.log('service',postData.posts);
        
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
//Renvoie un observable qui peut être utilisé par les composants pour écouter les mises à jour des publications.
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

//Envoie une requête HTTP POST pour ajouter une nouvelle publication.
//S'abonne à l'observable renvoyé par la requête HTTP.
//Met à jour le tableau posts et émet un événement de mise à jour via postsUpdated.
  addPost(title: string, content: string) {
    console.log('add post');
    
    const post: Post = { id: 'null', title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe(data => {
        console.log(data.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

//Envoie une requête HTTP DELETE pour supprimer une publication.
//S'abonne à l'observable renvoyé par la requête HTTP.
//Met à jour le tableau posts et émet un événement de mise à jour via postsUpdated.
  deletePost(id:string){
    this.http.delete('http://localhost:3000/api/posts/'+id)
    .subscribe( () =>{
      const updatedPosts = this.posts.filter(p => p.id != id)
      this.posts = updatedPosts
      this.postsUpdated.next([...this.posts])
    })
  }
}
