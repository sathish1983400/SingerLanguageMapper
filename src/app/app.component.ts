import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SingerLanguageMapper';
  myRadio: string = ''
  clickedTitle='';
  clickedEdit=false;
  showUpdatedMessage=false;
  showDeletedMessage=false;
  showDuplicateMessage=false;
  showInsertedMessage= false;
  data: any = null;

 constructor(private _http: Http,  private route: ActivatedRoute,
       private router: Router) {
   this.getMyBlog();

 }


private getMyBlog() {
   return this._http.get('http://localhost:8080/RESTfulExample/rest/json/metallica/get')
               .map((res: Response) => res.json())
                .subscribe(data => {
                       this.data = data;
               });
 }


}
