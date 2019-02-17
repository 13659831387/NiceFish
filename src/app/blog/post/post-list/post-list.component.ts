import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PostService } from '../post.service';

@Component({
	selector: 'post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss']
})
export class PostlistComponent implements OnInit {
	public rows: number = 10;
	public totalElements: number = 0;
	public currentPage: number = 0;
	public offset: number = 0;
	public end: number = 0;

	public postList: Array<any>;

	constructor(
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public postService: PostService) {
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log(params);
			this.currentPage = params.page;
			this.loadData();
		});
	}

	public loadData() {
		this.offset = (this.currentPage - 1) * this.rows;
		this.end = (this.currentPage) * this.rows;
		this.postService.getPostList(this.currentPage).subscribe(
			(res) => {
				console.log(res);
				this.postList = res.content;
				this.totalElements = res.totalElements;
			},
			error => {
				console.log(error);
			}
		);
	}

	public pageChanged(event: any): void {
		let temp = parseInt(event.page) + 1;
		let url = `post/post-list/page/${temp}`;
		this.router.navigateByUrl(url);
	}
}