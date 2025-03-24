import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class personal{
    private name!:string;
    private  phone!:number;
    nullphone!:number;
    private email!:string;
    private age!:string;
    questData:any[]=[];

    public getname(){
        return this.name;
    }
    public setname( name:string ){
        
       this.name=name;
    }
    public getphone(){
        return this.phone;
    }
    public setphone(phone:number){
        this.phone=phone;
    }
    public getemail(){
        return this.email;
    }
    public setemail(email:string){
       this.email=email;
    }
    public getage(){
        return this.age;
    }
    public setage(age:string){
        this.age=age;
    }
    public getquestData(){
        return this.questData;
    }
    public setquestData(questData: any[]){
        this.questData = questData;
    }
    
    clearAll(){
        this.name='';
        this.phone= this.nullphone;
        this.email='';
        this.age='';
        this.questData=[];
    }
}