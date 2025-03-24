import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})


export class feedback{
    userName:string="";
    userphone:string="";
    userEmail:string="";
    age:string="";
    answer:any[]=[];

    getUserName(){
        return this.userName
    }
    getUserphone(){
        return this.userphone
    }
    getUserEmail(){
        return this.userEmail
    }
    getAge(){
        return this.age
    }
    getAnswer(){
        return this.answer
    }
    clearAll(){
        this.userName="";
        this.userphone="";
        this.userEmail="";
        this.age="";
        this.answer=[];
    }
    

}