import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage{
  list: List;
  itemName: string;

  constructor(private wishesService: WishesService,
              private router: ActivatedRoute) {

    const listId = this.router.snapshot.paramMap.get('listId');
    this.list = this.wishesService.getList(listId);
  }

  addItem(){
    if(this.itemName.length === 0)  {
      return;
    }
    const newItem = new ListItem(this.itemName);
    this.list.items.push(newItem);

    this.itemName = '';
    this.wishesService.saveStorage();
  }

  checkChange(){
    const pendings = this.list.items
                          .filter(itemData => !itemData.completed).length;
    console.log(pendings);
    if(pendings === 0){
      this.list.completed = true;
      this.list.finishedAt = new Date();
    }else{
      this.list.completed = false;
      this.list.finishedAt = null;
    }
    
    this.wishesService.saveStorage();
  }

  delete(idx: number){
    this.list.items.splice(idx, 1);
    this.wishesService.saveStorage();
  }

}
