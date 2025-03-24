import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiFeedbackResponse, ApiResponse, ApiStatisticsResponse, Quiz } from "../manager/manager.component";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class HttpClientService{

    constructor(private http:HttpClient){}

    //讀取
    getApi(url:string):Observable<Quiz>{
        return this.http.get<Quiz>(url);
    }
    //讀取
    getApiForStastictis(url:string):Observable<ApiStatisticsResponse>{
        return this.http.get<ApiStatisticsResponse>(url);
    }
    //新增
    postApi(url:string,postData:any){
        return this.http.post(url,postData);
    }
    postApiForSearch(url:string,postData:any):Observable<ApiResponse>{
        return this.http.post<ApiResponse>(url,postData);
    }
    postApiForfeedback(url:string,postData:any):Observable<ApiFeedbackResponse>{
        return this.http.post<ApiFeedbackResponse>(url,postData);
    }
    //更新
    putApi(url:string,putData:any){
        return this.http.put(url,putData);
    }
    //刪除
    delApi(url:string){
        return this.http.delete(url);
    }
}