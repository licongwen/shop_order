import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
@Component({
	selector:'confirm-order',
	templateUrl:'confirm-order.html'
})

export class ConfirmOrderPage{
	orderInfo;
	constructor(public nav:NavController,public params:NavParams){
		this.filterOrderInfo(this.params.data);
	}

	filterOrderInfo(data){
		this.orderInfo=data.eachFood.filter((item)=>{
			return (item.sum>0)
		});
	}
	
	goback(){
		this.nav.pop();
	}
}