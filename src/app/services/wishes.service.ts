import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  lists: List[] = [];
  tasks: ListItem[];

  constructor() {
      this.loadStorage();
   }

   getLists(){
     return this.lists;
   }

   createList(listName: string){
     const newList = new List(listName);
     this.lists.push(newList);
     this.saveStorage();

     return newList.id;
   }
  
    getList(id:string | number){
      id = Number(id);
      return this.lists.find(listData => listData.id === id);
    }


   saveStorage(){
      localStorage.setItem('data',JSON.stringify(this.lists));
   }

   loadStorage(){
     if(localStorage.getItem('data')){
        this.lists =  JSON.parse(localStorage.getItem('data'))
      }else{
        this.lists = [];
      }
   }

  deleteList(list: List){
    this.lists = this.lists.filter(listData => listData.id !== list.id);
    this.saveStorage();
  }
}
