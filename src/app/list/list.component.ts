import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { Quiz } from "../manager/manager.component";
import { HttpClientService } from "../http-service/http-service";
import { createlist } from "../@services/createlist";
import { personal } from "../@services/personal";
import { DatePipe } from "@angular/common";
import { statistics } from "../@services/statistics";


export interface PeriodicElement {
  name: string;
  position: number;
  state: string;
  startdate: string;
  enddate: string;
  result: string;
}

const QuizArray1: Quiz[] = [];

@Component({
  selector: "app-list",
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  providers: [DatePipe], // 添加 DatePipe 到提供者
})
export class ListComponent {
  statisticVoList: any = [];
  nowData: Date = new Date();
  inputData!: any;
  title = "demo2";
  quizId?: number;
  searchData!: any;
  startDate: string = "";
  endDate: string = "";
  deleteboolean = false;
  elementArray: any[] = [];
  QuizArray: Quiz[] = [];
  quizArray: Quiz[] = [];

  newQuizArray: Quiz[] = [];
  // deleteArray: any[] = [];
  displayedColumns: string[] = [
    "id",
    "name",
    "ispublish",
    "startDate",
    "endDate",
    "result",
  ];
  checkBox = false;

  ngOnInit(): void {
    this.search();
    this.createlist.clearAll();
    this.personal.clearAll();
  }
  constructor(
    private router: Router,
    private http: HttpClientService,
    private createlist: createlist,
    private personal: personal,
    private statistics: statistics
  ) {}

  dataSource = new MatTableDataSource<Quiz>(QuizArray1);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //點擊時獲取問卷資料
  getQuizById(Event: MouseEvent) {
    Event.preventDefault();
    // 確保 target 是一個 HTMLAnchorElement
    const target = Event.target as HTMLAnchorElement;

    // 獲取 a 標籤的文字內容
    const textContent = target.textContent;
    for (let data of this.QuizArray) {
      if (data.name == textContent) {
        this.quizId = data.id;
      }
    }
    this.http
      .getApi("http://localhost:8080/quiz/getQuiz?quizId=" + this.quizId)
      .subscribe(
        (res) => {
          this.createlist.name = res.name;
          this.createlist.description = res.description;
          this.createlist.startDate = res.startDate;
          this.createlist.endDate = res.endDate;
          this.createlist.id = res.id;
          this.router.navigateByUrl("/inside");
          for (let Ques of res.quesList) {
            Ques.options = JSON.parse(Ques.options);

            this.createlist.quesList = res.quesList;
          }
        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }

  //搜尋方法
  search() {
    this.searchData = {
      name: this.inputData,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.http
      .postApiForSearch("http://localhost:8080/quiz/search", this.searchData)
      .subscribe(
        (res) => {
          this.QuizArray = res.search;
          
          let quizArray = [];
          for (let Quiz of this.QuizArray) {
            let startDate = new Date(Quiz.startDate);
            let endDate = new Date(Quiz.endDate);
          
            
            (Quiz.checkBox = false), (Quiz.result = "前往");
            if (
              Quiz.published &&
              this.nowData.getTime() < startDate.getTime()
            ) {
              Quiz.ispublish = "未開始";
            }
            if (
              Quiz.published &&
              this.nowData.getTime() >= startDate.getTime()
            ) {
              Quiz.ispublish = "進行中";
            }
            if (Quiz.published && this.nowData.getTime() > endDate.getTime()) {
              Quiz.ispublish = "已結束";
            }
            if (!Quiz.published) {
              Quiz.ispublish = "未發布";
            }
          }
          for (let Quiz of this.QuizArray) {
            if (Quiz.ispublish != "未發布") {
              quizArray.push(Quiz);
            }
          }
          this.dataSource = new MatTableDataSource<Quiz>(quizArray);
          this.dataSource.paginator = this.paginator; // 重新設定分頁器
        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }
  getfeedback(quizId: number, event: Event) {
    event.preventDefault();
    this.http
      .postApi("http://localhost:8080/quiz/feedback", quizId)
      .subscribe((res) => {
        console.log(res);
      });
    this.router.navigateByUrl("/statisics");
  }
  getStastisticById(quizId: number, event: Event) {
    event.preventDefault();

    this.http
      .getApiForStastictis(
        "http://localhost:8080/quiz/statistics?quizId=" + quizId
      )
      .subscribe(
        (res) => {
          this.statisticVoList = res.statisticVoList;
          let ststisticsData: any[] = [];

          let keys: string[] = [];
          let option: any[] = [];
          let values: any[] = [];
          let optionCountArray: any[] = [];
          for (let statistic of this.statisticVoList) {
            if (
              statistic.qeesIdOptionCountMap &&
              Object.keys(statistic.qeesIdOptionCountMap).length > 0
            ) {
              keys = Object.keys(statistic.qeesIdOptionCountMap);
              values = Object.values(statistic.qeesIdOptionCountMap);
            }
            ststisticsData.push({
              quizName: statistic.quizName,
              quesName: statistic.quesName,
              quesId: statistic.quesId,
              option: keys,
              result: values,
            });

            keys = [];
            values = [];
          }
          this.statistics.ststisticsData=ststisticsData;
          this.router.navigateByUrl("/statisics");

        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }
}
