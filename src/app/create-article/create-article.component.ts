import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {

  successMessage: string = '';

  article: Article = {
    articleId: 0, // This will be auto-generated by the backend
    title: '',
    content: '',
    author: '',
    date: new Date().toISOString() // Set the current date
    ,
    description: ''
  };

  constructor(private router: Router, private articleService: ArticleService) {

  }

  backToArticle() {
    this.router.navigate(['article']);
  }

  onSubmit(): void {

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');


    this.articleService.submitArticle(this.article).subscribe(
      response => {
        console.log('Article submitted successfully!', response);
        // Optionally, reset the form or navigate to another page
        this.successMessage = 'Article submitted successfully! Redirecting...';

        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['article']);
        }, 2000);
      },
      error => {
        console.error('There was an error submitting the article!', error);
      }
    );
  }




}
