import { Component, OnInit } from '@angular/core';
import { SingerService } from '../singer.service';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css']
})
export class SingerDetailComponent implements OnInit {

  titleOnLoad='';
  singerFromScreen='';
  showUpdatedMessage=false;
  data: any = null;
  constructor(private http: Http, private route: ActivatedRoute,
        private router: Router,private singerService: SingerService) { }

  ngOnInit() {
    this.getSinger();
  }


  goBack(): void {
    this.router.navigate(['/singer']);
  }


  getSinger()  {
      const title= this.route.snapshot.paramMap.get('title');
      this.titleOnLoad= title;
        return this.http.get('http://localhost:8080/RESTfulExample/rest/json/metallica/' + this.titleOnLoad)
                    .map((res: Response) => res.json())
                     .subscribe(data => {
                            this.data = data;
                          //  console.log("data is" + JSON.stringify(data));
                            this.singerFromScreen = data[0].singer;
                    });

  }

  public updateSingerinHeroDetail(song) {
    const title= this.route.snapshot.paramMap.get('title');
    var headers = new Headers();
    headers.append ( 'Content-Type', 'application/json');
    const url = "http://localhost:8080/RESTfulExample/rest/json/metallica/";
    const url1 = url +title;
        this.http.put(url1, {"title":title,"singer":song.singer}, {headers : headers })
       .subscribe ((res )=> {
           if (res.status === 200) {
             this.showUpdatedMessage=true;
             this.singerService.sendUpdatedStatus(title);
             this.router.navigate(['/singer']);
             return res;

           }
     });

  }
}
