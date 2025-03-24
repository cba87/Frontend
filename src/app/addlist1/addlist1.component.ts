import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createlist } from '../@services/createlist';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-addlist1',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './addlist1.component.html',
  styleUrl: './addlist1.component.scss'
})
export class Addlist1Component {
  listName:string='';
  listContent:string='';
  startDate: string | null = null;
  endDate:string | null = null;
  minDate1:any
  minDate2:any
  constructor(private createlist:createlist,private router:Router){}

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()+1).padStart(2, '0');
    const day1 = String(today.getDate()+2).padStart(2, '0');
  
    this.minDate1 = `${year}-${month}-${day}`; // 轉為符合格式的字串
    this.minDate2 = `${year}-${month}-${day1}`; // 轉為符合格式的字串

    
    if(this.createlist.name!=""){
      this.listName=this.createlist.getname();
      this.listContent=this.createlist.getdescription();
      this.startDate=this.createlist.getstartDate();
      this.endDate=this.createlist.getendDate();
    }
  }
  
  finish(){
    if(this.listName==''){
      alert('請填寫問卷名稱');
      return
    }
    if(this.listContent==''){
      alert('請填寫問卷內容');
      return
    }
    if(!this.startDate){
      alert('請填寫問卷開始時間');
      return
    }
    if(this.endDate==null){
      alert('請填寫問卷結束時間');
      return
    }
    this.createlist.name=this.listName
    this.createlist.description=this.listContent
    this.createlist.startDate=this.startDate
    this.createlist.endDate=this.endDate
    this.router.navigateByUrl('/tab/addlist2')
  } 
  
}
