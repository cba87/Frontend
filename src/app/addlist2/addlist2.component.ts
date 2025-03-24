import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { createlist, Ques } from "../@services/createlist";
import { Router } from "@angular/router";

@Component({
  selector: "app-addlist2",
  standalone: true,
  imports: [FormsModule, MatIconModule, MatTableModule, MatPaginatorModule],
  templateUrl: "./addlist2.component.html",
  styleUrl: "./addlist2.component.scss",
})
export class Addlist2Component {
  reviseboolean=false;
  reviseindex:number=0;
  selectData: string = "新增問題類型";
  title = "問題內容";
  required = false;
  optionArray1 = [{}, {}];
  newoptionArray1: any[] = [{ optionName: "" },{ optionName: "" }];
  quesList: any[] = [];
  reviseArray: any[] = [];
  quesId = 0;
  tableData: any[] = [];
  newlist: any;
  textanswer: string = "";
  quesName: string = "";
  displayedColumns: string[] = ["問題號碼", "是否必填", "問題名稱", "類型"];
  selectedValues: number[] = [];

  constructor(private createlist: createlist, private router: Router) {}

  ngOnInit(): void {

    // this.tidyArray();
    if (this.createlist.name != "") {
      this.quesList = this.createlist.getquesList();
      this.quesId=this.quesList.length;
    }
  }
  //將optionArray1陣列拆解並新增optionName選項
  tidyArray() {
    for (let data of this.optionArray1) {
      this.newoptionArray1.push({ optionName: "" });
    }
  }
  //每當變換selectData的題目類型時清空原本問題已填入的資料
  changetype() {
    this.quesName = "";
    this.required = false
    if (this.selectData != "single") {
      this.newoptionArray1 = [];
      for (let data of this.optionArray1) {
        this.newoptionArray1.push({ optionName: "" });
      }
    }
    if (this.selectData != "multi") {
      this.newoptionArray1 = [];
      for (let data of this.optionArray1) {
        this.newoptionArray1.push({ optionName: "" });
      }
    }
    if (this.selectData != "text") {
      this.textanswer = "";
    }
  }
  //單選新增選項用的方法
  addoption1() {
    this.newoptionArray1.push({ optionName: "" });
    console.log(this.newoptionArray1);
  }
  //單選移除選項的方法
  remove1() {
    if (this.newoptionArray1.length <= 2) {
      alert("單選選項不能少於2");
      return;
    }
    if (this.newoptionArray1.length > 2) {
      this.newoptionArray1?.splice(this.newoptionArray1?.length - 1);
    }
  }
  //新增問題的同時將需要的資料塞入陣列中
  addQuestion() {
    if (this.quesName == "") {
      alert("問題題目不能為空");
      return;
    }
    if (this.selectData !== "text") {
      for (let data of this.newoptionArray1) {
        if (data.optionName == "") {
          alert("選項不能為空");
          return;
        }
      }
    }
    if (this.selectData != "text") {
      this.quesList.push({
        quesId: this.quesId,
        required: this.required,
        quesName: this.quesName,
        type: this.selectData,
        options: this.newoptionArray1,
      });
      
    }
    
    if (this.selectData == "text") {
      this.quesList.push({
        quesId: this.quesId,
        required: this.required,
        quesName: this.quesName,
        type: this.selectData,
        options: [],
      });
    }
    this.quesId = 1;
    for (let data of this.quesList) {
      data.quesId = this.quesId;
      this.quesId++;
    }
    this.selectData="新增問題類型";
    this.quesName="";

    this.createlist.quesList = this.quesList;
  }

  preview() {
    this.router.navigateByUrl("/preview");
  }
  //把被勾選的問題index值作為Key值放入陣列
  updateSelection(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter((v) => v !== value);
    }
    this.selectedValues.sort((a, b) => a - b);
    console.log(this.selectedValues);
  }
  //依照上面方法回傳的陣列去做刪除資料的動作
  delete() {
    // 先將選擇的值轉換為數字（保險起見，避免索引為字串）
    const indicesToDelete = this.selectedValues.map(Number);

    // 從最後開始刪除
    indicesToDelete.sort((a, b) => b - a); // 降序排序
    for (let i = 0; i < indicesToDelete.length; i++) {
      this.quesList.splice(indicesToDelete[i], 1);
    }

    // for (let i = this.selectedValues.length - 1; i >= 0; i--) {
    //   this.quesList.splice(this.selectedValues[i], 1);
    //   console.log(this.quesList);
    // }
    // 重設選取列表和重新編號
    this.selectedValues = [];
    this.quesId = 1;
    for (let data of this.quesList) {
      data.quesId = this.quesId;
      this.quesId++;
    }
    //清空所有選項
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }
  //把被選中的值再丟回輸入框
  ReInput(index: number) {
    this.reviseboolean=true;
    this.required = this.quesList[index].required;
    this.quesName = this.quesList[index].quesName;
    this.selectData = this.quesList[index].type;
    this.newoptionArray1 = this.quesList[index].options;
    this.reviseindex=index;
  }
  Revise() {
    this.reviseboolean=false;
    this.reviseArray.push({
      quesId: this.quesId,
      required: this.required,
      quesName: this.quesName,
      type: this.selectData,
      options: this.newoptionArray1,
    });
    console.log(this.reviseArray);
    this.quesList[this.reviseindex] = this.reviseArray[0];
    this.quesId = 1;
    for (let data of this.quesList) {
      data.quesId = this.quesId;
      this.quesId++;
    }
    this.reviseindex=0;
    this.reviseArray = [];
    this.selectData="新增問題類型";
    this.quesName="";
  }
  gotoaddlist1(){
    this.router.navigateByUrl("/tab/addlist1")

  }
  
}
