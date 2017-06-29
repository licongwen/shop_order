import { Component,ViewChild } from '@angular/core';
import { Slides,NavController,ToastController,ModalController } from 'ionic-angular';

import { ConfirmOrderPage } from '../confirm-order/confirm-order';
import { ShopCartPage } from '../shop-cart/shop-cart';

@Component({
  selector: 'page-shop-main',
  templateUrl: 'shop-main.html'
})
export class ShopMainPage {
  constructor(public nav:NavController,
              public toast:ToastController,
              public modal:ModalController
              ) {
  	this.initAllFood();
    this.initOrder();
  }
  @ViewChild('mySlider') slider:Slides;

  isAllFood:boolean=true;
  foodType:Array<{typeId:string,typeName:string,foods:any,isActive:boolean}>;
  orderInfo:{orderId:any,eachFood:any,orderState:any,orderTime:any,tSum:any,tPrice:any};
  food:{foodInfo:any,sum:any,tPrice:any};
  type_1:any;
  type_2:any;
  type_3:any;
  type_4:any;
  type_5:any;

  initOrder(){
    this.initAllFood();
    let arr=[];
    for(let i=0;i<this.foodType.length;i++){
      for(let j=0;j<this.foodType[i].foods.length;j++){
        this.food={foodInfo:this.foodType[i].foods[j],sum:0,tPrice:0.00};
        arr.push(this.food);
      }
    }
    this.orderInfo={
      orderId:'000000',orderState:'open',orderTime:'2017-6-6 16:00:00',eachFood:arr,tSum:0,tPrice:0.00
    };
  }

  initAllFood(){
  	this.type_1 = [
      {foodId:"food_1",foodName:"芒果",foodPrice:12.25,foodSV:100},
      {foodId:"food_2",foodName:"水蜜桃",foodPrice:12.2,foodSV:99},
      {foodId:"food_3",foodName:"台湾金钻凤梨",foodPrice:12.5,foodSV:1010},
      {foodId:"food_4",foodName:"水蜜桃",foodPrice:17.25,foodSV:120},
      {foodId:"food_5",foodName:"水蜜桃",foodPrice:19.25,foodSV:103},
      {foodId:"food_6",foodName:"水蜜桃",foodPrice:19.25,foodSV:11},
      {foodId:"food_7",foodName:"水蜜桃",foodPrice:12.25,foodSV:10},
      {foodId:"food_8",foodName:"芒果",foodPrice:16.25,foodSV:15}
    ];
    this.type_2 = [
      {foodId:"food_9",foodName:"马奶提",foodPrice:12.25,foodSV:100},
      {foodId:"food_10",foodName:"芒果",foodPrice:12.2,foodSV:99},
      {foodId:"food_11",foodName:"葡萄",foodPrice:12.5,foodSV:1010},
      {foodId:"food_12",foodName:"哈密瓜",foodPrice:17.25,foodSV:120},
      {foodId:"food_30",foodName:"菠萝",foodPrice:17.25,foodSV:120},
      {foodId:"food_31",foodName:"柚子",foodPrice:17.25,foodSV:120},
      {foodId:"food_32",foodName:"榴莲",foodPrice:17.25,foodSV:120},
      {foodId:"food_33",foodName:"橙子",foodPrice:17.25,foodSV:120}
    ];
    this.type_3 = [
      {foodId:"food_13",foodName:"西瓜",foodPrice:12.25,foodSV:100},
      {foodId:"food_14",foodName:"菠萝",foodPrice:12.2,foodSV:99},
      {foodId:"food_15",foodName:"奇异果",foodPrice:12.5,foodSV:1010},
      {foodId:"food_16",foodName:"美国进口香蕉",foodPrice:17.25,foodSV:120}
    ];
    this.type_4 = [
      {foodId:"food_17",foodName:"牛油果",foodPrice:12.25,foodSV:100},
      {foodId:"food_18",foodName:"碧根果",foodPrice:12.2,foodSV:99},
      {foodId:"food_19",foodName:"夏威夷果",foodPrice:12.5,foodSV:1010},
      {foodId:"food_28",foodName:"辣条",foodPrice:12.5,foodSV:1010},
      {foodId:"food_29",foodName:"薯片",foodPrice:12.5,foodSV:1010},
      {foodId:"food_20",foodName:"瓜子",foodPrice:17.25,foodSV:120}
    ];
    this.type_5 = [
      {foodId:"food_21",foodName:"百岁山",foodPrice:12.25,foodSV:100},
      {foodId:"food_22",foodName:"黄酒",foodPrice:12.2,foodSV:99},
      {foodId:"food_23",foodName:"葡萄酒",foodPrice:12.5,foodSV:1010},
      {foodId:"food_24",foodName:"果粒橙",foodPrice:17.25,foodSV:120},
      {foodId:"food_25",foodName:"雪碧",foodPrice:17.25,foodSV:120},
      {foodId:"food_26",foodName:"可乐",foodPrice:17.25,foodSV:120},
      {foodId:"food_27",foodName:"五粮液",foodPrice:17.25,foodSV:120}
    ];
  	this.foodType=[
  	  { typeId: "type_1", typeName: "本季热销" ,foods:this.type_1,isActive:false},
      { typeId: "type_2", typeName: "国产精品" ,foods:this.type_2,isActive:false},
      { typeId: "type_3", typeName: "进口水果" ,foods:this.type_3,isActive:false},
      { typeId: "type_4", typeName: "坚果零食" ,foods:this.type_4,isActive:false},
      { typeId: "type_5", typeName: "进口酒水" ,foods:this.type_5,isActive:false}
  	]
  };
  //页面载入时，启动轮播图
  ngOnInit(){
  	setInterval((()=>{
  		this.slider.slideNext(300,true);
  	}),2000)
  }
  //切换商品菜单
  clickType(typeId){
  	this.initAllFood();
  	this.isAllFood=false;
  	if(typeId=='all'){
  		this.isAllFood=true;
  	}
  	this.foodType = this.foodType.filter((i)=>{
          i.isActive = false;
          if(i.typeId==typeId){
            i.isActive = true;
          }else if(typeId!="all"){
            i.foods = null;
          }
          return true;
        });
  }
  //对商品数量和总价的操作
  changeOrder(foodId,method){
    let tSum=0;
    let tPrice=0;
    for(let i=0;i<this.orderInfo.eachFood.length;i++){
      if(this.orderInfo.eachFood[i].foodInfo.foodId==foodId){
        if(method=='add'){
          this.orderInfo.eachFood[i].sum+=1;
          this.orderInfo.eachFood[i].tPrice=this.orderInfo.eachFood[i].sum*this.orderInfo.eachFood[i].foodInfo.foodPrice;
        }
        if(method=='remove' && this.orderInfo.eachFood[i].sum>0){
          this.orderInfo.eachFood[i].sum-=1;
          this.orderInfo.eachFood[i].tPrice=this.orderInfo.eachFood[i].sum*this.orderInfo.eachFood[i].foodInfo.foodPrice;
        }
      }
      tSum +=this.orderInfo.eachFood[i].sum;
      tPrice+=this.orderInfo.eachFood[i].tPrice;
    }
    this.orderInfo.tSum=tSum;
    this.orderInfo.tPrice=tPrice.toFixed(2);
  }
  //点击添加商品
  cartAdd(e,foodId){
    this.changeOrder(foodId,'add');
  }
  //点击减少商品
  cartRemove(foodId){
    this.changeOrder(foodId,'remove');
  }
  //跳转结账页面
  pay(){
    if(this.orderInfo.tSum==0){
      let toast=this.toast.create({
        message:'选点东西吧，购物车都空了!-_-',
        duration:2000,
        position:'middle'
      });
      toast.present(toast);
    }else{
      this.nav.push(ConfirmOrderPage,this.orderInfo);
    }  
  }
  //进入购物车
  gotoCart(){
    if(this.orderInfo.tSum==0){
      let toast=this.toast.create({
        message:'选点东西吧，购物车都空了!-_-',
        duration:2000,
        position:'middle'
      })
      toast.present(toast);
    }
    else{
      let modal=this.modal.create(ShopCartPage,this.orderInfo);
      modal.present(modal);
    }
  }
}
