import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, firstname: 'Rahul', lastname:'Raj', email:'abc@gmail.com', password:'admin' },
      { id: 12, firstname: 'Sony', lastname:'Raj', email:'xyz@gmail.com', password:'admin' }
    ];
    

    const posts= [
      {id: 1, title:'the first author', author:'AD',image:'gallery-image-1.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 2, title:'the second author', author:'AD',image:'gallery-image-2.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 3, title:'the third author', author:'AD',image:'gallery-image-3.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 4, title:'the forth author', author:'AD',image:'gallery-image-4.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 5, title:'the fifth author', author:'AD',image:'gallery-image-5.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 6, title:'the sixth author', author:'AD',image:'gallery-image-6.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 7, title:'the seventh author', author:'AD',image:'gallery-image-1.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 8, title:'the eight author', author:'AD',image:'gallery-image-1.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 9, title:'the ninth author', author:'AD',image:'gallery-image-1.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},
      {id: 10, title:'the tenth author', author:'AD',image:'gallery-image-1.jpg', publishdate:'2019-01-19T07:22Z', excert :'This is the summary'},

    ];
    return {users, posts};
  }

  getToken(user){
    return 'this is a token';
  }

  get(reqInfo: RequestInfo){
    if (reqInfo.collectionName === 'posts') {
      return this.getArticles(reqInfo);
    }
    return undefined;
  }

  getArticles(reqInfo: RequestInfo) {

    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const collection = reqInfo.collection;
      const id = reqInfo.id;
      const data = id === undefined ? collection : reqInfo.utils.findById(collection, id);
  
      console.log(data);
  
      const options: ResponseOptions = data ?
      {
        body: dataEncapsulation ? { data } : data,
        status: 200
      } :
      {
        body: { error: `Post not found` },
        status: 404
      };
  
      options.statusText = options.status === 200 ? 'ok' : 'Not Found' ;
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;
      return options;
  
  
    });
  }
  



  post(reqInfo: RequestInfo){
    if(reqInfo.id === 'login'){
      console.log('from login');
      return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const users = reqInfo.collection.find(user => {
          return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password ;
        });

        let responseBody = {};

        if (users) {
          responseBody = {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
           
            email: users.email,
            token: this.getToken(users)
          };
        }

        const options: ResponseOptions = responseBody ?
        {
          body: dataEncapsulation ? { responseBody } : responseBody,
          status: 200
        } :
        {
          body: { error: `'User' with email='${reqInfo.req['body'].email}' not found` },
          status: 404
        };

        options.statusText = options.status === 200 ? 'ok' : 'Not Found' ;
        options.headers = reqInfo.headers;
        options.url = reqInfo.url;
        return options;

      });
    }else if(reqInfo.id === 'signup') {
        reqInfo.id = null;
      console.log('from signup');
    }
  } 
}
