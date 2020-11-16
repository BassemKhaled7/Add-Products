import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedProducts:{ title: string , content: string , id?:string}[] = [];
  isLoaded=false;
  constructor(private http: HttpClient , private PostsService:PostsService) {}

  ngOnInit() {
    this.isLoaded=false;
    this.PostsService.getData()  
  .subscribe(products=>{
this.loadedProducts=products;
this.isLoaded=true;
  })
  }

  onCreateProduct(postData: { title: string ; content: string}) {
    // Send Http request
   this.PostsService.createPost(postData)
   .subscribe(responseData => {
    console.log(responseData);
    this.loadedProducts.push(postData);
    
  });
  }      




  onFetchProducts() {
    this.isLoaded=false;

this.PostsService.getData()  
  .subscribe(products=>{
this.loadedProducts=products;
this.isLoaded=true;

  })}

  onClearProducts() {

this.PostsService.deleteData().subscribe(()=>{
  this.loadedProducts=[];
})
  }


  deleteProduct(productId){
console.log(productId);
this.loadedProducts.splice(productId,1);


  }
}


