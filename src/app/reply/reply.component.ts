import { Component } from "@angular/core";
import { createlist } from "../@services/createlist";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { feedback } from "../@services/feedback";
import { Router } from "@angular/router";

@Component({
  selector: "app-reply",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./reply.component.html",
  styleUrl: "./reply.component.scss",
})
export class ReplyComponent {
  constructor(private createlist: createlist, private feedback: feedback,private router:Router) {}
  name?: string;
  phone?: string;
  email?: string;
  age?: string;
  questArray: any[] = [];
  feedbackdata: any;
  feedbackArray: any[] = [];
  answerArray: any[] = [];
  index: number = 0;
  quesanswer: any[] = [];


  ngOnInit(): void {
    this.name = this.feedback.getUserName();
    this.phone = this.feedback.getUserphone();
    this.email = this.feedback.getUserEmail();
    this.age = this.feedback.getAge();
    this.questArray = this.createlist.getquesList();
    this.answerArray = this.feedback.getAnswer();
    
    for (let ques of this.questArray) {
       this.quesanswer[this.index]={ ...ques, answer: this.answerArray[this.index] };
      this.index++;
      
    }
  }
  goback(){
    this.router.navigateByUrl("/tab/addlist3");
  }
}
