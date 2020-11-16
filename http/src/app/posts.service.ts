import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http:HttpClient) { }


createPost(postData){
 return this.http
  .post(
    'https://ng-bassem.firebaseio.com/products.json',
    postData
  ) 

}


getData(){

 return this.http.get <{ [ key:string]:{ title: string, content: string } }> ( 'https://ng-bassem.firebaseio.com/products.json')
.pipe( 
  map(responseData => {
const postArray:{ title: string, content: string , id?:string}[]=[];
 for (const key in responseData){
   postArray.push({...responseData[key] , id:key})
 }
  return postArray;  
  }))   
}


deleteData(){

  return this.http.delete('https://ng-bassem.firebaseio.com/products.json');
}



}

