import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { createlist } from "../@services/createlist";
import { Router } from "@angular/router";
import { HttpClientService } from "../http-service/http-service";

@Component({
  selector: "app-preview",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./preview.component.html",
  styleUrl: "./preview.component.scss",
})
export class PreviewComponent {
  constructor(
    private router: Router,
    private createlist: createlist,
    private http: HttpClientService
  ) {}
  name?: string;
  description?: string;
  quesList: any[] = [];
  startDate: any;
  endDate: any;
  published?: boolean;
  id?: number;
  ngOnInit(): void {
    this.name = this.createlist.name;
    this.description = this.createlist.description;
    this.quesList = this.createlist.getquesList();
    this.startDate = this.createlist.startDate;
    this.endDate = this.createlist.endDate;
    this.published = this.createlist.published;
    this.id = this.createlist.id;    
  }

  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    age: new FormControl(""),
  });
  goback() {
    this.router.navigateByUrl("/tab/addlist1");
  }
  save() {
    let quesArray = JSON.parse(JSON.stringify(this.createlist.getquesList()));
    for (let data of quesArray) {
      if (typeof data.options !== "string") {
        data.options = JSON.stringify(data.options);
      }
    }

    //要新增問卷
    if (this.id != 0) {
      for (let data of quesArray) {
        if ((data.quizId = this.id)) {
          continue;
        }
        data.quizId = this.id;
      }
      const quiz = {
        id: this.id,
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate, //
        published: this.published,
        quesList: quesArray,
      };

      this.http.postApi("http://localhost:8080/quiz/update", quiz).subscribe(
        (res) => {
          console.log(res);
          this.createlist.clearAll();
          this.router.navigateByUrl("/manager"); // 可在成功後跳轉
        },
        (err) => {
          console.error("Error:", err);
        }
      );
      return;
    }
    //修該問卷
    {
      this.createlist.clearAll();
      const quiz = {
        id: this.id,
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        published: this.published,
        quesList: quesArray,
      };
      this.http.postApi("http://localhost:8080/quiz/create", quiz).subscribe(
        (res) => {
          console.log(res);
          this.createlist.clearAll();
          this.router.navigateByUrl("/manager"); // 可在成功後跳轉
        },
        (err) => {
          console.error("Error:", err);
        }
      );
    }
  }
  saveAndPublish() {
    let quesArray = JSON.parse(JSON.stringify(this.createlist.getquesList()));
    for (let data of quesArray) {
      if (typeof data.options !== "string") {
        data.options = JSON.stringify(data.options);
      }
    }
    this.published = true;

    //新增問卷
    if (this.id != 0) {
      for (let data of quesArray) {
        if ((data.quizId = this.id)) {
          continue;
        }
        data.quizId = this.id;
      }
      const quiz = {
        id: this.id,
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate, //
        published: this.published,
        quesList: quesArray,
      };
      console.log(quiz);

      this.http.postApi("http://localhost:8080/quiz/update", quiz).subscribe(
        (res) => {
          console.log(res);
          this.createlist.clearAll();
          this.router.navigateByUrl("/manager"); // 可在成功後跳轉
        },
        (err) => {
          console.error("Error:", err);
        }
      );
      return;
    }
    //修改問卷
    {
      this.createlist.clearAll();
      const quiz = {
        id: this.id,
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        published: this.published,
        quesList: quesArray,
      };
      this.http.postApi("http://localhost:8080/quiz/create", quiz).subscribe(
        (res) => {
          console.log(res);
          this.createlist.clearAll();
          this.router.navigateByUrl("/manager"); // 可在成功後跳轉
        },
        (err) => {
          console.error("Error:", err);
        }
      );
    }
  }
}
