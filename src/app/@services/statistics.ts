import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class statistics{

    ststisticsData:any[]=[]
    
    getststisticsData(){
       return this.ststisticsData;
    }
    
}