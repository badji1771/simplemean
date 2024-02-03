import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { Subscription } from 'rxjs';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  private postsSub = new Subscription();

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    console.log('on init');
    
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        console.log(`les posts liste :`, this.posts);
      });
      
  }

  onDelete(id:string){
    this.postsService.deletePost(id)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
