import { Get } from '@nestjs/common';
export class Product {
    private _store:string;
    private _productName: string;
    private _price: number;
    private _buyDate: string;
    private _unity:number;
    private _wasAcquired:boolean;
    
    
  
    constructor(store:string,
      productName:string,
      price:number,
      buyDate:string,
      unity:number,
      wasAcquired:boolean) {
        this._store = store;
        this._productName = productName;
        this._price = price;
        this._buyDate = buyDate;
        this._unity = unity;
        this._wasAcquired = wasAcquired;
      }
    
    get store():string{
        return this._store;
      }
      
    get productName() : string {
        return this._productName
      }
    
    get  price():number{
        return this._price;
    }
    
    get buyDate():string{
        return this._buyDate;
    } 
    
    get unity():number{
        return this._unity;
    } 

    get wasAcquired():boolean{
      return this._wasAcquired;
    }
  }