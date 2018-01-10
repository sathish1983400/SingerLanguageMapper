import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {SingerService} from '../singer.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})

export class SingerComponent implements OnInit {

myForm:FormGroup;
  myRadio: string = ''
  clickedTitle='';
  showUpdatedMessage=false;
  showDeletedMessage=false;
  showDuplicateMessage=false;
  showInsertedMessage= false;
  showDataExists= false;
  data: any = null;
  status= false;
  titleUpdate='';

  constructor(private _http: Http,  private route: ActivatedRoute,
        private router: Router,private singerService: SingerService) { this.getMyBlog(); }

  ngOnInit() {
    this.status= this.singerService.getUpdatedStatus();
    this.titleUpdate= this.singerService.getUpdateTitle();
  }

  public deleteSinger(song) {
   this.initializeAllMessages();
    var headers = new Headers();
    headers.append ( 'Content-Type', 'application/json');
    this.clickedTitle= song;

    const url = "http://localhost:8080/RESTfulExample/rest/json/metallica/";
    const url1 = url + song;
        this._http.delete(url1,  {headers : headers }).toPromise()
             .then(() => {
             this.getMyBlog();
             this.showDeletedMessage=true;
           });
  }

  private getMyBlog() {
    return this._http.get('http://localhost:8080/RESTfulExample/rest/json/metallica/get')
                .map((res: Response) => res.json())
                 .subscribe(data => {
                        this.data = data;
                });
  }

  onSubmit= function (song) {
    this.initializeAllMessages();
    document.getElementById("heroDetailComponentDetails").className = "invisible";
    var headers = new Headers();
    headers.append ( 'Content-Type', 'application/json');

       this._http.post('http://localhost:8080/RESTfulExample/rest/json/metallica/post', {"title":song.myRadio,"singer":song.singer}, {headers : headers })
        .subscribe (res => {
            if (res.status === 201) {
             this.getMyBlog();
             this.showInsertedMessage =true;
            }
          },
          err => {
            //  if (err.status=== 428) {
            //this.showDuplicateMessage=true;
            //}
            if (err._body== "AAPI_104") {
            this.showDuplicateMessage=true;
            this.showDataExists=false;

            }
            if (err._body== "AAPI_105") {
            this.showDataExists=true;
            this.showDuplicateMessage = false;
            }
          }
        );


 }

  public updateSinger(song) {
    this.router.navigate(['/singerdetail/'+ song.title]);
   }


 public initializeAllMessages() {
   this.showUpdatedMessage=false;
   this.showDeletedMessage=false;
   this.showDuplicateMessage=false;
   this.showInsertedMessage =false;
   this.status =false;
   this.showDataExists = false;
 }

}
