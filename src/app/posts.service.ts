import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

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

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

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

  deletePost(id:string){
    this.http.delete('http://localhost:3000/api/posts/'+id)
    .subscribe( () =>{
      const updatedPosts = this.posts.filter(p => p.id != id)
      this.posts = updatedPosts
      this.postsUpdated.next([...this.posts])
    })
  }
}
