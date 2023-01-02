import { ProductE } from 'src/entities/product.entity';
import { Product } from '../product/product.dto';

export class ShoppingList {
   
    private _total: number;
    private _dateList: string;
    private _user:number;
    
    
    
  
    constructor(total:number,dateList:string,user:number ) {
        this._total = total;
        this._dateList = dateList;
        this._user = user;
      }
    

      
    get total() : number {
        return this._total
      }
    
    get dateList():string{
        return this._dateList;
    } 

    get user():number{
        return this._user;
    }
    

    
   
  }