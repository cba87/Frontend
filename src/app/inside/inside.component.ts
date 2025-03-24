import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { personal } from "../@services/personal";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { createlist } from "../@services/createlist";
import { Validator } from "@angular/forms";
import { Quiz } from "../manager/manager.component";
;


@Component({
  selector: "app-inside",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./inside.component.html",
  styleUrl: "./inside.component.scss",
})
export class InsideComponent {
  quiz: Quiz = {
    name: "",
    id: 0,
    description: "",
    published: true,
    startDate:"",
    endDate:"",
    result: "",
    checkBox: false,
    ispublish: "",
    quesList: [],
  };

  constructor(
    private router: Router,
    private personal: personal,
    private createlist: createlist
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
  });
  ngOnInit(): void {
    
    
    // 將問卷資料塞進回答頁
    this.quiz.id = this.createlist.getId();
    this.quiz.description = this.createlist.getdescription();
    this.quiz.name = this.createlist.getname();
    this.quiz.quesList = this.createlist.getquesList();
    if (!this.personal.questData || this.personal.questData.length == 0) {
      for (let Ques of this.quiz.quesList) {
        if (Ques.type != "text") {
          let updatedOptions = [];
          // 遍歷每個選項
          for (let optionsdata of Ques.options) {
            // 正確的推送新物件
            updatedOptions.push({ ...optionsdata, answer: false });
          }
          Ques.options = updatedOptions;
        }
        if (Ques.type == "text") {
          
          Ques.answer = "";
        }
      }
    }
    //有資料代表是返回的
    if (
      this.personal.questData != null &&
      this.personal.getquestData().length > 0
    ) {
      // 當有資料的話就要將使用者的資料跟回答塞進欄位
      this.form.patchValue({
        name: this.personal.getname(),
        phone: this.personal.getphone(),
        email: this.personal.getemail(),
        age: this.personal.getage(),
      });
      this.quiz.quesList = this.personal.getquestData();
    }
  }

  public gotocontirmation() {
    if (!this.form.valid) {
      alert("請填寫上方個人資料");
      return;
    }

    if (!this.answerTest()) {
      alert("請填寫下方問題");
      return;
    }

    this.router.navigateByUrl("/Confirmation");
    this.personal.setname(this.form.get("name")?.value);
    this.personal.setphone(this.form.get("phone")?.value);
    this.personal.setemail(this.form.get("email")?.value);
    this.personal.setage(this.form.get("age")?.value);
    this.personal.setquestData(this.quiz.quesList);
  }
  //檢查每一個option內的布林值 只要有該option裡有一個true
  //booleanArray內也放一個true再回傳整個陣列
  public answerTest(): boolean {
    
    // 多選M 單選Q 文字輸入T
    for (let ques of this.quiz.quesList) {
      if(ques.required){
      if (ques.type != "text") {
        for (let i = 0; i <= ques.options.length - 1; i++) {
          if (ques.options[i].answer != false) {
            break;
          }
          if (i == ques.options.length - 1) {
            return false;
          }
        }
      }
      if (
        (ques.answer == null || ques.answer.trim() === "") &&
        ques.type === "text"
      ) {
        return false;
      }
    }
  }
    return true;
  }

  public test() {
    console.log(this.quiz.quesList);
  }

  public gotolist() {
    this.router.navigateByUrl("/list");
  }

  //把沒選到的選項的option.answer轉為False
  changeData(data: any, options: any) {
    for (let option of options) {
      if (data.optionNumber != option.optionNumber) {
        option.answer = false;
      }
    }
  }
}
