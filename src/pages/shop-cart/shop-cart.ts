import { Component } from '@angular/core';

import { NavController, NavParams,ViewController,AlertController} from 'ionic-angular';


@Component({
  selector: 'page-shop-cart',
  templateUrl: 'shop-cart.html'
})
export class ShopCartPage {
  orderInfo;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl:ViewController,
  	public alertCtrl:AlertController
  ){
  	this.initOrder(this.navParams.data);
  }
  dismiss(){
    	this.viewCtrl.dismiss();
	}

   initOrder(data){
   	this.orderInfo=data.eachFood.filter((item)=>{
   		return (item.sum>0);
   	})
   }

   changeOrder(foodId,method){
   	let tSum=0;
   	let tPrice=0;
   		for(let i=0;i<this.navParams.data.eachFood.length;i++){
   			if(method=='clear'){
	   			this.navParams.data.eachFood[i].sum=0;
	   			this.navParams.data.eachFood[i].tPrice=0;
   			}
   			if(this.navParams.data.eachFood[i].foodInfo.foodId==foodId){
   				if(method=='add'){
   					this.navParams.data.eachFood[i].sum=this.navParams.data.eachFood[i].sum+1;
   				}
   				if(method=='remove'&&this.navParams.data.eachFood[i].sum>0){
   					this.navParams.data.eachFood[i].sum=this.navParams.data.eachFood[i].sum-1;
   				}
   				if(method=='delete'){
   					this.navParams.data.eachFood[i].sum=0;
   					this.navParams.data.eachFood[i].tPrice=0;
   				}
   				this.navParams.data.eachFood[i].tPrice = this.navParams.data.eachFood[i].sum * this.navParams.data.eachFood[i].foodInfo.foodPrice;
          		this.navParams.data.eachFood[i].tPrice = parseFloat(this.navParams.data.eachFood[i].tPrice.toFixed(2));
   			}
   			tSum=tSum+this.navParams.data.eachFood[i].sum;
   			tPrice=tPrice+this.navParams.data.eachFood[i].tPrice;
   		}
   		this.navParams.data.tSum=tSum;
   		this.navParams.data.tPrice=tPrice.toFixed(2);
   		this.initOrder(this.navParams.data);
   }
   //清空购物车
   clearCart(){
   		let confirm=this.alertCtrl.create({
   			title:'提示',
   			message:'确认清空购物车吗？',
   			buttons:[
   				{
   					text:'cancle',
   					handler:()=>{}
   				},
   				{
   					text:'ok',
   					handler:()=>{
   						this.changeOrder(null,'clear');
   						this.dismiss();
   					}
   				}
   			]
   		});
   		confirm.present();
   }
   //增加商品数量
   cartAdd(foodId){
    this.changeOrder(foodId,'add');
  }
  //减少商品数量
  cartRemove(foodId){
  	this.changeOrder(foodId,'remove');
  }
  //左滑删除操作
  delete(foodId){
  	this.changeOrder(foodId,'delete');
  }
  //左滑备注操作
  remark(foodId,foodName){
  	let alert=this.alertCtrl.create();
  	alert.setTitle(foodName+':请选择您的口味：');

  	alert.addInput({
  		type:'checkbox',
  		label:'不辣',
  		value:'nohot',
  		checked:true
  	});
  	alert.addInput({
         type: 'checkbox',
         label: '微辣',
         value: 'littlehot'
       });
       alert.addInput({
         type: 'checkbox',
         label: '特辣',
         value: 'verryhot'
       });
       alert.addInput({
         type: 'checkbox',
         label: '少盐',
         value: 'littlesalt'
       });
       alert.addInput({
         type: 'checkbox',
         label: '多盐',
         value: 'manysalt'
       });
       alert.addInput({
         type: 'checkbox',
         label: '不要味精',
         value: 'noaginomoto'
       });
       alert.addInput({
         type: 'checkbox',
         label: '不要蒜',
         value: 'nogarlic'
       });
       alert.addInput({
         type: 'checkbox',
         label: '其他',
         value: 'other'
       });

  	alert.addButton('取消');
  	alert.addButton({
  		text:'确认',
  		handler:()=>{}
  	})
  	alert.present();
  }
}
