import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { personal } from "../@services/personal";
import { createlist } from "../@services/createlist";
import { DatePipe } from "@angular/common";
import { HttpClientService } from "../http-service/http-service";


@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [],
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.scss",
  providers: [DatePipe], // 添加 DatePipe 到提供者
})
export class ConfirmationComponent {
  name?: string;
  phone?: number;
  email?: string;
  age?: string;
  questArray: any[] = [];
  feedbackdata: any;
  feedbackArray: any[] = [];

  constructor(
    private router: Router,
    private personal: personal,
    private createlist: createlist,
    private datePipe: DatePipe,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.name = this.personal.getname();
    this.phone = this.personal.getphone();
    this.email = this.personal.getemail();
    this.age = this.personal.getage();
    this.questArray = this.personal.getquestData();
    console.log(this.questArray);
  }
  public gotolist() {
    for (let ques of this.questArray) {
      if (ques.type != "text") {
        let answerArray = [];
        for (let option of ques.options) {
          if (option.answer != false) {
            answerArray.push(option.optionName);
          }
        }
        this.feedbackArray.push({ quesId: ques.quesId, answers: answerArray});
      }
      if (ques.type == "text") {
        if (ques.answer) {
          this.feedbackArray.push({ quesId: ques.quesId ,answers: [ques.answer]});
        } 
        if(!ques.answer){
          this.feedbackArray.push({ quesId: ques.quesId ,answers: []});
        }
      }
    }
    let answer = Object.fromEntries(
      this.feedbackArray.map(item => [item.quesId, item.answers || []])
    );
    

    this.feedbackdata = {
      quizId: this.createlist.getId(),
      userName: this.name,
      phone: this.phone,
      email: this.email,
      age: this.age,
      fillinDate: this.getCurrentTime(),
      answer: answer,
    };
    console.log(this.feedbackdata);
    this.http
      .postApi("http://localhost:8080/quiz/fillin", this.feedbackdata)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl("/list");
        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }

  public goBackInside() {
    this.router.navigateByUrl("/inside");
  }
  getCurrentTime(): string {
    const date = new Date();
    return this.datePipe.transform(date, "yyyy-MM-dd") || ""; // 格式化為指定格式
  }
}
