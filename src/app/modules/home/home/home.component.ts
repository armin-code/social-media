import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from './../../../core/service/auth.service';
import { Posts } from './../../../models/posts';
import { PostsService } from './../../../services/posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  page = 1;
  data: Posts;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getData();
    this.createForm();
  }

  getData(): void {
    const userIdForFilter = !this.authService.isInfluencer() ?  this.authService.getCurrentUserId() : null
    this.postsService
      .getPosts(this.page, userIdForFilter)
      .subscribe(response => {
        if (this.data) {
          const { results, next, previous } = response.body;
          this.data.results = [...this.data.results, ...results];
          this.data.next = next;
          this.data.previous = previous;
        } else {
          this.data = response.body;
        }
      });
  }

  loadMore(): void {
    this.page++;
    this.getData();
  }

  private createForm(): void {
    this.formGroup = this.fb.group({
      text: new FormControl('', {
        validators: [Validators.required]
      }),
      username: new FormControl(null)
    });
  }

  savePost(): void {
    if (this.formGroup.valid) {
      this.postsService.addPost(this.formGroup.value).subscribe(() => {
        this.page = 1;
        this.getData();
      });
    }
  }
}
