import { Component, Input, ViewChild, ViewChildren } from '@angular/core';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { WishesService } from '../../services/wishes.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent{
 @Input() finished = true;
 
 @ViewChild(IonList,{static:true}) list: IonList;

  constructor(public wishesService: WishesService,
              private router: Router,
              private alertController: AlertController) { }

  selectedList(list: List){
    if(this.finished){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }
  
  deleteList(list: List){
    this.wishesService.deleteList(list);
  }

  async editList(list: List){
    const alert = await this.alertController.create({
      header: 'Edit list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title
        }
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ( ) => {
            console.log('Cancelar');
            this.list.closeSlidingItems();
          }
        },{
          text: 'Save',
          handler: (data) => {
            if(data.title.length === 0){
              return
            }else{
              list.title = data.title;
              this.wishesService.saveStorage();
              this.list.closeSlidingItems();
            }
          }
        }
      ]
    });

  alert.present();
}

}
