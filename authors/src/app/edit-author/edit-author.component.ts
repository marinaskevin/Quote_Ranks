import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  id: String;
  name: String;
  errors: any;
  private sub: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getAuthor();
    });
  }

  getAuthor()
  {
    var observable = this._httpService.getAuthor(this.id);
    observable.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
    });
  }

  putAuthor()
  {
    var observable = this._httpService.putAuthor(this.id,this.name);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.errors = data.error;
      }
      else
      {
        this._router.navigate(['/home']);
      }
    });
  }
}
