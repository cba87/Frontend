import { Injectable } from "@angular/core";

export interface Ques {
    quesId: number;
    required: boolean;
    quesName: string;
    type: string;
    options:Ques[];
  }
@Injectable({
    providedIn:'root'
})


export class createlist{


    name:string="";
    id:number=0;
    description:string="";
    startDate:any;
    endDate:any;
    published:boolean = false;
    quesList:any[]=[]

    clearAll(){
        this.name="";
        this.description="";
        this.startDate=null;
        this.endDate=null;
        this.quesList=[];
        this.id=0;
    }
    getId(){
        return this.id;
    }
    getname(){
        return this.name;
    }
    getdescription(){
        return this.description;
    }
    getstartDate(){
        return this.startDate;
    }
    getendDate(){
        return this.endDate;
    }
    getpublished(){
        return this.published;
    }
    getquesList(){
        return this.quesList;
    }
    
}