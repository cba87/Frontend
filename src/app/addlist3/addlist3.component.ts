import { Component } from "@angular/core";
import { HttpClientService } from "../http-service/http-service";
import { createlist } from "../@services/createlist";
import { feedback } from "../@services/feedback";
import { Router } from "@angular/router";

@Component({
  selector: "app-addlist3",
  standalone: true,
  imports: [],
  templateUrl: "./addlist3.component.html",
  styleUrl: "./addlist3.component.scss",
})
export class Addlist3Component {
  feedbackList: any[] = [];
  userArray: any[] = [];
  answerArray: any[] = [];
  quesList: any[] = [];
  quesNumber = 1;

  displayedColumns: string[] = ["編號", "姓名", "填寫時間", "觀看回復"];

  constructor(
    private http: HttpClientService,
    private createList: createlist,
    private feedback: feedback,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quesList = this.createList.getquesList();
    let quizId = this.createList.getId();
    this.http
      .postApiForfeedback("http://localhost:8080/quiz/feedback", quizId)
      .subscribe((res) => {
        console.log(res);

        this.feedbackList = res.feedbackDtoList;
        //將API回傳的資料整理成依照填寫者分類
        let i = 1;        
        for (let feedback of this.feedbackList) {
          
          if (feedback.quesId == 1) {
            this.userArray.push({
              quesId: i,
              userName: feedback.userName,
              fillinDate: feedback.fillinDate,
              result: "結果",
            });
            i++;
          }
        }

      });
  }
  stastictisByName(userName: string, event: Event) {
    event.preventDefault();
    let newfeedbackList = this.feedbackList;

    for (let feedback of newfeedbackList) {
      if (feedback.userName == userName) {
        let answer = JSON.parse(feedback.answerStr);
        this.answerArray.push(answer);
        this.feedback.userName = feedback.userName;
        this.feedback.userphone = feedback.userphone;
        this.feedback.userEmail = feedback.userEmail;
        this.feedback.age = feedback.age;
      }
    }
    console.log(this.answerArray);
    this.feedback.answer = this.answerArray;
    this.answerArray = [];
    this.router.navigateByUrl("/reply");
  }
}
